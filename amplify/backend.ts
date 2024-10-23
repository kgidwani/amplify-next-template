// import { defineBackend } from '@aws-amplify/backend';
// import { auth } from './auth/resource.js';
// import { data } from './data/resource.js';

// defineBackend({
//   auth,
//   data,
// });


import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from './data/resource.js';

const backend = defineBackend({
  auth,
  data
});

// Configure a policy for the required use case.
// The actions included below cover all supported ML capabilities
backend.auth.resources.unauthenticatedUserIamRole.addToPrincipalPolicy(
  new PolicyStatement({
    actions: [
      "translate:TranslateText",
      "polly:SynthesizeSpeech",
      "transcribe:StartStreamTranscriptionWebSocket",
      "comprehend:DetectSentiment",
      "comprehend:DetectEntities",
      "comprehend:DetectDominantLanguage",
      "comprehend:DetectSyntax",
      "comprehend:DetectKeyPhrases",
      "rekognition:DetectFaces",
      "rekognition:RecognizeCelebrities",
      "rekognition:DetectLabels",
      "rekognition:DetectModerationLabels",
      "rekognition:DetectText",
      "rekognition:DetectLabel",
      "rekognition:SearchFacesByImage",      
      "textract:AnalyzeDocument",
      "textract:DetectDocumentText",
      "textract:GetDocumentAnalysis",
      "textract:StartDocumentAnalysis",
      "textract:StartDocumentTextDetection",
    ],
    resources: ["*"],
  })
);

backend.addOutput({
  custom: {
    Predictions: {
      convert: {
        translateText: {
          defaults: {
            sourceLanguage: "en",
            targetLanguage: "es",
          },
          proxy: false,
          region: "eu-central-1",
        },
        speechGenerator: {
          defaults: {
            voiceId: "Ivy",
          },
          proxy: false,
          region: "eu-central-1",
        },
        transcription: {
          defaults: {
            language: "en-US",
          },
          proxy: false,
          region: "eu-central-1",
        },
      },
      identify: {
        identifyEntities: {
          defaults: {
            collectionId: "default",
            maxEntities: 10,
          },
          celebrityDetectionEnabled: true,
          proxy: false,
          region: "eu-central-1",
        },
        identifyLabels: {
          defaults: {
            type: "ALL",
          },
          proxy: false,
          region: "eu-central-1",
        },
        identifyText: {
          defaults: {
            format: "ALL",
          },
          proxy: false,
          region: "eu-central-1",
        },
      },
      interpret: {
        interpretText: {
          defaults: {
            type: "ALL",
          },
          proxy: false,
          region: "eu-central-1",
        },
      },
    },
  },
});
