import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as path from 'path';

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

@Injectable()
export class FirebaseService {

  private firebase: any;

  constructor() {
    const serviceAccount = require(path.resolve(__dirname, '../../../muscle-up-afdf7-firebase-adminsdk-c6g5i-3f7ec8cee9.json'));

    this.firebase = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }

  async pushNotify() {
    await sleep(3000);
    console.log(this.firebase);
    console.log('firebase push notify...');

    const token = 'c7e-sXlVfeUew-QXJmc5bX:APA91bH7RxQCVIPjA89LUvETETV1zXig5YWjJnWwNeen5GWQxb2LxCUjFhBDX18s53cgnw1QtWQhQeAcy_QKsJ5HqKGcqdsV0wOz_YK5SYyyfg-Fj33YwCzQdczEgjA_0Y4D8y2H3sXm1';

    const message: admin.messaging.Message = {
      notification: {
        title: 'NestJS Rox',
        body: 'Your Notification Body',
      },
      token: token,
    };

    try {
      const response = await this.firebase.messaging().send(message);
      console.log('Successfully sent message:', response);
      return 'Notification sent successfully';
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

}
