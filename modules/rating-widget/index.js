module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Rating Widget',
  },
  fields: {
    add: {
      productQuality: {
        type: 'range',
        label: 'Product Quality',
        min: 1,
        max: 5,
        step: 1,
        def: 1
      },
      productSafety: {
        type: 'range',
        label: 'Product Safety',
        min: 1,
        max: 5,
        step: 1,
        def: 1
      },
      productValue: {
        type: 'range',
        label: 'Product Value',
        min: 1,
        max: 5,
        step: 1,
        def: 1
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [ 'productQuality', 'productSafety', 'productValue' ]
      }
    }
  },
  components(self) {
    return {
      async stars(req, data) {
        // Performs any data manipulation or retrieval
        // before it is passed to the component template
        // In this case, we are just passing the starsData from the widget
        return {
          starsData: data.starsData
        };
      }
    };
  },
  apiRoutes(self) {
    return {
      post: {
        async submit(req) {
          // Destructure input ratings and identifiers from the request body
          const { quality = 3, safety = 3, value = 3 } = req.body.ratings;
          const { widgetId } = req.body;
  
          const ratingDocument =
            (await fetchRatingDocument(req, widgetId)) ?? {};
  
          // Calculate new average ratings
          const newAverages = calculateNewAverages(
            ratingDocument,
            quality,
            safety,
            value
          );
  
          // Update the document with new average ratings
          await updateDocument(widgetId, newAverages);
  
          return newAverages;
        }
      }
    };
    // Fetches the rating document from the database
    async function fetchRatingDocument(req, widgetId) {
      const criteria = { _id: widgetId };
      return await self.apos.db.collection('reviewRatings').findOne(criteria);
    }
  
    // Calculate new average ratings
    function calculateNewAverages(ratingDocument, quality, safety, value) {
      // Destructure existing averages and count, using -1 as a fallback for missing averages
      const {
        averageQuality = -1,
        averageSafety = -1,
        averageValue = -1,
        ratingsCount = 0
      } = ratingDocument;
  
      // Function to update the average, includes formula explanation
      const updateAverage = (oldAverage, newValue, count) => {
        // If there were no reviews yet, the new value becomes the average
        if (oldAverage === -1) return newValue;
        // Formula to update the running average
        return parseFloat(
          ((oldAverage * (count - 1) + newValue) / count).toFixed(1)
        );
      };
  
      return {
        // Update each average using the helper function
        averageQuality: updateAverage(averageQuality,quality,ratingsCount + 1),
        averageSafety: updateAverage(averageSafety, safety, ratingsCount + 1),
        averageValue: updateAverage(averageValue, value, ratingsCount + 1),
        // Increment the ratings count
        ratingsCount: ratingsCount + 1
      };
    }
  
    // Updates the document in the database
    async function updateDocument(widgetId, newAverages) {
      try {
        const { averageQuality, averageSafety, averageValue, ratingsCount } =
          newAverages;
        const criteria = {
          _id: widgetId
        };
        const updateQuery = {
          $set: {
            averageQuality: averageQuality,
            averageSafety: averageSafety,
            averageValue: averageValue,
            ratingsCount: ratingsCount
          }
        };
        await self.apos.db
          .collection('reviewRatings')
          .updateOne(criteria, updateQuery, { upsert: true });
      } catch (e) {
        console.log('error', e);
      }
    }
  }
};
