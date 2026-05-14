export type QuizHistory = {
  quiz_id: number;
  score: number;
  time_spent_seconds: number;
};

export type Achievement = {
  id: string;
  icon: string;
  name: string;
  description: string;
  unlocked: boolean;
};

type AchievementTexts = {
  achievements_list: Record<string, { name: string; description: string }>;
};

export const computeAchievements = (
  history: QuizHistory[],
  points: number,
  completedWorlds: number,
  totalWorlds: number,
  text: AchievementTexts,
): Achievement[] => [
  {
    id: "first_quiz",
    icon: "🏆",
    name: text.achievements_list.first_quiz.name,
    description: text.achievements_list.first_quiz.description,
    unlocked: history.length >= 1,
  },
  {
    id: "perfect_score",
    icon: "⭐",
    name: text.achievements_list.perfect_score.name,
    description: text.achievements_list.perfect_score.description,
    unlocked: history.some(
      (q) =>
        q.score >= 1 && q.score === Math.max(...history.map((h) => h.score)),
    ),
  },
  {
    id: "first_world",
    icon: "🌍",
    name: text.achievements_list.first_world.name,
    description: text.achievements_list.first_world.description,
    unlocked: completedWorlds >= 1,
  },
  {
    id: "all_worlds",
    icon: "🔥",
    name: text.achievements_list.all_worlds.name,
    description: text.achievements_list.all_worlds.description,
    unlocked: completedWorlds >= totalWorlds && totalWorlds > 0,
  },
  {
    id: "dedicated",
    icon: "📚",
    name: text.achievements_list.dedicated.name,
    description: text.achievements_list.dedicated.description,
    unlocked: history.length >= 5,
  },
  {
    id: "master",
    icon: "💎",
    name: text.achievements_list.master.name,
    description: text.achievements_list.master.description,
    unlocked: points >= 100,
  },
];
