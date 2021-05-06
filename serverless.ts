import type { AWS } from "@serverless/typescript";

import { hello, translate } from "@functions/index";

const serverlessConfiguration: AWS = {
  service: "serverless01",
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  plugins: ["serverless-webpack"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
    lambdaHashingVersion: "20201221",
    // profile: "default",
    region: "ap-northeast-2",
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: ["translate:*"],
        Resource: "*",
      },
    ],
  },
  // import the function via paths
  functions: { hello, translate },
};

module.exports = serverlessConfiguration;
