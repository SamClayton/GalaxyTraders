import SimpleSchema from 'simpl-schema'
SimpleSchema.extendOptions(['autoform'])
export const Games = new Mongo.Collection('games')

SimpleSchema.debug = true

// Define the subdocument schema first, so that it's available for the main document schema
// See AAT codebase support/setup_default.ini for explanations and values
let Settings = new SimpleSchema({
  // These correspond to the AAT game settings
  inventoryFactor: {type: Number, label: 'Inventory Factor', defaultValue: 1},
  upgradeCost: {type: Number, label: 'Upgrade Cost', defaultValue: 500},
  upgradeFactor: {type: Number, label: 'Upgrade Factor', defaultValue: 1.0767},
  planetUpgradeFactor: {type: Number, label: 'Planet Upgrade Factor', defaultValue: 1.0671},
  sdUpgradeFactor: {type: Number, label: 'SD Upgrade Factor', defaultValue: 1.0743},
  levelFactor: {type: Number, label: 'Level Factor', defaultValue: 1.04138},
  maxTechLevel: {type: SimpleSchema.Integer, label: 'Max Tech Level', defaultValue: 600},
  // This is base price that is used to increase all port prices of all commodities.  Raise this value if you want port prices to increase faster.
  portPriceControl: {type: Number, label: 'Port Price Control', defaultValue: 50},
  initialNumSectors: {type: Number, label: 'Initial Number of Sectors', defaultValue: 5000, max: 50000, min: 20 },
  maxFedspaceTechLevel: {type: SimpleSchema.Integer, defaultValue: 160, label: 'Maximum avg tech level after which ship is towed from FedSpace'},
  maxOwnedPlanets: {type: SimpleSchema.Integer, defaultValue: 0},
  igbDepositInterestRate: {type: Number, defaultValue: 0.00005, label: 'IGB interest rate on deposits'},
  igbLoanInterest: {type: Number, defaultValue: 0.0006, label: 'IGB interest rate on loans'},
  igbLoanFee: {type: Number, defaultValue: 0.1, label: 'Loan origination fee'},
  igbLoanLimit: {type: Number, label: 'IGB Loan Maximum (% net worth)', defaultValue: 0.25},
  igbMaxDeposit: {type: Number, label: 'Maximum amount of a deposit account', defaultValue: 100000000000},
  igbLoanRate: {type: Number, label: 'Minutes before an IGB loan is due', defaultValue: 1440}
})

Games.schema = new SimpleSchema({
  name: {type: String, label: 'Game Name', unique: true, max: 140},
  // TODO Can I auto-populate the playerCount, onlinePlayerCount, and dailyPlayerCount here? Read more on denormalized counts
  playerCount: {type: Number, label: 'Player Count', optional: true, autoform: {type: 'hidden'}},
  onlinePlayerCount: {type: Number, label: 'Players Online', optional: true, autoform: {type: 'hidden'}},
  dailyPlayerCount: {type: Number, label: 'Active Player Last 24h', optional: true, autoform: {type: 'hidden'}},
  startDate: {
    type: Date,
    label: 'Start Date',
    optional: true,
    autoform: {
      afFieldInput: {
        type: 'bootstrap-datetimepicker',
        dateTimePickerOptions: {
          minDate: new Date(),
          defaultDate: moment().add(1, 'hour'),
          autoclose: true
        }
      },
      timezoneId: 'America/Los_Angeles'
    },
    autoValue: function () {
      if (this.isInsert) {
        return new Date()
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()}
      } else {
        this.unset()  // Prevent user from supplying their own value when it's already defined
      }
    }
  },
  endDate: {
    type: Date,
    label: 'End Date',
    optional: true,
    autoform: {
      afFieldInput: {
        type: 'bootstrap-datetimepicker',
        dateTimePickerOptions: {
          useCurrent: false,
          defaultDate: moment().add(6, 'months'),
          minDate: new Date(),
          autoclose: true
        }
      },
      timezoneId: 'America/Los_Angeles'
    }
  },
  ageDays: {
    type: Number,
    label: 'Game Age',
    optional: true,
    autoform: {type: 'hidden'},
    autoValue: function () {
      if (this.isInsert) {
        return 0
      } else if (this.isUpsert) {
        return {$setOnInsert: 0}
      } else {
        this.unset()  // Prevent user from supplying their own value
        if (this.siblingField('startDate').isSet && this.siblingField('startDate').value != null) {
          console.log('Calculating new age in days from startDate: ' +
            Math.round((new Date() - new Date(this.siblingField('startDate').value)) /
            (1000 * 60 * 60 * 24)))
          return Math.round((new Date() - new Date(this.siblingField('startDate').value)) /
            (1000 * 60 * 60 * 24))
        }
      }
    }
  },
  isActive: {type: Boolean, label: 'Active?', defaultValue: false, autoform: {type: 'hidden'}},
  isEnded: {type: Boolean, label: 'Ended?', defaultValue: false, autoform: {type: 'hidden'}},
  settings: {type: Settings}
})

Games.allow({
  insert: function (userId, doc) {
    return Roles.userIsInRole(userId, 'Administrator')
  }
})

Games.attachSchema(Games.schema)

// Meteor example of how to extend to hook into denormalization maintenance functions
/* class Games extends Mongo.Collection {
    insert(doc, callback) {
        doc.createdAt = doc.createdAt || new Date();
        const result = super.insert(doc, callback);
        incompleteCountDenormalizer.afterInsertTodo(doc);
        return result;
    }
} */

// TODO: Research whether to move some of this functionality to client-only or server-only blocks
/*
if (Meteor.isClient || Meteor.isServer) {
}
*/
