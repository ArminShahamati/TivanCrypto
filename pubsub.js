const redis = require("redis");

const CHANNEL = {
  TEST: "TEST",
};

class PubSub {
  constructor() {
    this.publisher = redis.createClient();
    this.subscriber = redis.createClient();

    this.subscriber.subscribe(CHANNEL.TEST);

    this.subscriber.on("message", (channel, message) =>
      this.handleMessage(channel, message)
    );
  }

  handleMessage(channel, message) {
    console.log(
      `Message Recieved. Channel : ${channel}. Message : ${message}. `
    );
  }
}

const testPubSub = new PubSub();

setTimeout(() => {
  testPubSub.publisher.publish(CHANNEL.TEST, "foo");
}, 1000);
