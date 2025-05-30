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

export type Review = Rows<'reviews'> & { is_deleted?: boolean };
export type ReviewInsert = Inserts<'reviews'> & { is_deleted?: boolean };
export type ReviewUpdate = Updates<'reviews'> & { is_deleted?: boolean };

export type Role = Rows<'roles'>;
export type RoleInsert = Inserts<'roles'>;
export type RoleUpdate = Updates<'roles'>;

export type UserReview = Rows<'user_review'>;
export type UserReviewInsert = Inserts<'user_review'>;
export type UserReviewUpdate = Updates<'user_review'>;

export type UserRole = Rows<'user_role'>;
export type UserRoleInsert = Inserts<'user_role'>;
export type UserRoleUpdate = Updates<'user_role'>;

export type ExternalReview = Rows<'external_reviews'>;
export type ExternalReviewInsert = Inserts<'external_reviews'>;
export type ExternalReviewUpdate = Updates<'external_reviews'>;

export type ExternalReviewQuestion = Rows<'external_review_questions'>;
export type ExternalReviewQuestionInsert = Inserts<'external_review_questions'>;
export type ExternalReviewQuestionUpdate = Updates<'external_review_questions'>;

export type ExternalReviewAnswer = Rows<'external_review_answers'>;
export type ExternalReviewAnswerInsert = Inserts<'external_review_answers'>;
export type ExternalReviewAnswerUpdate = Updates<'external_review_answers'>;

// User with roles type for admin panel
export type UserRoleWithName = {
  role_id: string;
  role_name: string;
};

export type UserWithRoles = {
  id: string;
  username: string;
  full_name: string | null;
  is_active: boolean;
  roles: UserRoleWithName[];
};

// Reviewer with reviewees type for relationships management
export type RevieweeInfo = {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url?: string | null;
};

export type ReviewerWithReviewees = {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url?: string | null;
  reviewees: RevieweeInfo[];
};

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
export type SimpleUserReview = {
  id: string;
  reviewer: AppUser;
  reviewee: AppUser;
  reviewee_completed_timestamp: string | null;
  reviewee_started_timestamp: string | null;
  reviewer_completed_timestamp: string | null;
  reviewer_started_timestamp: string | null;
  feedback_completed_timestamp: string | null;
  initial_email_sent: boolean;
  review: {
    start_date: string | null;
    end_date: string | null;
    is_active: boolean;
    name: string;
  };
};

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
export type FeedbackScore = Views<'feedback_scores'>;
