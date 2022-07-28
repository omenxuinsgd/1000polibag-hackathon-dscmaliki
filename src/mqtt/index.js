const mqtt = require("mqtt");

const { storeDataStakeHolder, storeDataHasilTanam } = require("./dataHandler");

const client = mqtt.connect(process.env.MQTT_HOST)

client.on('connect',()=> {
    console.log("MQTT Broker connected");
    client.subscribe('lomba-gdsc/stakeholder',() => console.log('lomba-gdsc/stakeholder subscribed'));
    client.subscribe('lomba-gdsc/hasiltanam',() => console.log('lomba-gdsc/hasiltanam subscribed'));
})

//Device message should be in JSON string format
client.on('message',(topic,payload) => {
    if(topic === 'lomba-gdsc/stakeholder'){
        storeDataStakeHolder(payload)
    }else if(topic === 'lomba-gdsc/hasiltanam'){
        storeDataHasilTanam(payload)
    }
})

module.exports = client