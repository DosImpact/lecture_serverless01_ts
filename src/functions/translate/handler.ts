import "source-map-support/register";

import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

import * as AWS from "aws-sdk";
import { Translate } from "aws-sdk";

const translate = new AWS.Translate();

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  // check exist , event.body.language event.body.text
  const { language, text } = event.body;
  try {
    const translateParams: Translate.Types.TranslateTextRequest = {
      Text: text,
      SourceLanguageCode: "en",
      TargetLanguageCode: language,
    };

    const translaredMessage = await translate
      .translateText(translateParams)
      .promise();

    return formatJSONResponse({
      translaredMessage,
    });
  } catch (error) {
    return formatJSONResponse({
      message: "error in aws translate",
    });
  }
};

export const main = middyfy(hello);
