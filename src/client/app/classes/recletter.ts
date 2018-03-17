import { CandidateQuestion } from './candidatequestion';

export class RecLetter{
    _id: string;
    letterContents: string;
    candidateQuestions: Array<CandidateQuestion>;
}