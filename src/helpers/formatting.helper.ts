import { Injectable } from '@nestjs/common';
import { Posts } from '@prisma/client';

@Injectable()
export class FormattingHelper {
  static filterPostPropertiesAndRemoveId(body: Posts) {
    delete body.id;
    delete body.createdAt;
    delete body.updatedAt;
    !body.image && delete body.image;
    return body;
  }

  static filterPostPropertiesAndKeepId(body: Posts) {
    delete body.createdAt;
    delete body.updatedAt;
    !body.image && delete body.image;
    return body;
  }
}
