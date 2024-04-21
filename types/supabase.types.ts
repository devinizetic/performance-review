import {
  Inserts,
  Rows,
  Updates,
  FunctionsReturns,
  Views
} from './supabase.extension';

export type AppUser = Rows<'app_users'>;
export type AppUserInsert = Inserts<'app_users'>;
export type AppUserUpdate = Updates<'app_users'>;

export type Answer = Rows<'answers'>;
export type AnswerInsert = Inserts<'answers'>;
export type AnswerUpdate = Updates<'answers'>;

export type Choice = Rows<'choices'>;
export type ChoiceInsert = Inserts<'choices'>;
export type ChoiceUpdate = Updates<'choices'>;

export type QuestionChoice = Rows<'question_choice'>;
export type QuestionChoiceInsert = Inserts<'question_choice'>;
export type QuestionChoiceUpdate = Updates<'question_choice'>;

export type QuestionHint = Rows<'question_hints'>;
export type QuestionHintInsert = Inserts<'question_hints'>;
export type QuestionHintUpdate = Updates<'question_hints'>;

export type Question = Rows<'questions'>;
export type QuestionInsert = Inserts<'questions'>;
export type QuestionUpdate = Updates<'questions'>;

export type ReviewQuestion = Rows<'review_question'>;
export type ReviewQuestionInsert = Inserts<'review_question'>;
export type ReviewQuestionUpdate = Updates<'review_question'>;

export type ReviewerReviewee = Rows<'reviewer_reviewee'>;
export type ReviewerRevieweeInsert = Inserts<'reviewer_reviewee'>;
export type ReviewerRevieweeUpdate = Updates<'reviewer_reviewee'>;

export type Review = Rows<'reviews'>;
export type ReviewInsert = Inserts<'reviews'>;
export type ReviewUpdate = Updates<'reviews'>;

export type Role = Rows<'roles'>;
export type RoleInsert = Inserts<'roles'>;
export type RoleUpdate = Updates<'roles'>;

export type UserReview = Rows<'user_review'>;
export type UserReviewInsert = Inserts<'user_review'>;
export type UserReviewUpdate = Updates<'user_review'>;

export type UserRole = Rows<'user_role'>;
export type UserRoleInsert = Inserts<'user_role'>;
export type UserRoleUpdate = Updates<'user_role'>;

//custom
export type ActiveReview = { id: string | undefined };
export type FullReviewQuestion = {
  question: FullQuestion;
  question_sequence: number;
} & Question;
export type FullQuestion = {
  choices: Choice[];
  questionHints: QuestionHint[];
} & Question;
export type FullReview = {
  questions: FullReviewQuestion[];
} & Review;
export type FullUserReview = {
  review: FullReview;
  reviewer: AppUser;
  reviewee: AppUser;
  answers: Answer[];
} & UserReview;

export type ReviewerRevieweeView = {
  reviewer_id: string;
  reviewee_id: string;
  username: string;
  full_name: string;
  avatar_url: string;
  user_review_id: string;
  reviewee_completed: boolean;
  reviewer_completed: boolean;
};

export type AnswersSortedView = Views<'answers_sorted'>;
