
const StakeHolder = require("../db/Models/Stakeholder");
const HasilTanam = require("../db/Models/HasilTanam");

module.exports = {
    storeDataStakeHolder: async(payload) => {
        const rawData = payload.toString()
        try {
            const dataJson = await JSON.parse(rawData)
            const newData = await new StakeHolder(dataJson).save()
        } catch (error) {
            console.error(`Error ${error.message}`)
        }
    },
    storeDataHasilTanam: async(payload) => {
        const rawData = payload.toString()
        try {
            const dataJson = await JSON.parse(rawData)
            const newData = await new HasilTanam(dataJson).save()
        } catch (error) {
            console.error(`Error ${error.message}`)
        }
    },
}