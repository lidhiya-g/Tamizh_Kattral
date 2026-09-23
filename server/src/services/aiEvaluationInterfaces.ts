/**
 * Future AI Handwriting Evaluation Service Interface
 */
export interface HandwritingEvaluationResult {
  completed: boolean;
  message: string;
  accuracyScore?: number;
}

export interface HandwritingEvaluationService {
  evaluateStroke(character: string, canvasImageData: string): Promise<HandwritingEvaluationResult>;
}

export class BasicPracticeCompletionService implements HandwritingEvaluationService {
  async evaluateStroke(character: string, canvasImageData: string): Promise<HandwritingEvaluationResult> {
    return {
      completed: true,
      message: 'Practice complete',
    };
  }
}

/**
 * Future AI Pronunciation Evaluation Service Interface
 */
export interface PronunciationEvaluationResult {
  score: number;
  phonemeFeedback: string[];
}

export interface PronunciationEvaluationService {
  evaluateAudio(targetText: string, audioBlob: Buffer): Promise<PronunciationEvaluationResult>;
}

export class BasicPronunciationService implements PronunciationEvaluationService {
  async evaluateAudio(targetText: string, audioBlob: Buffer): Promise<PronunciationEvaluationResult> {
    return {
      score: 100,
      phonemeFeedback: ['Clear pronunciation recorded'],
    };
  }
}
