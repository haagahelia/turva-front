# Progress Model

## Overview

The progress model defines how worlds are unlocked and completed within the game.

---

## World Unlocking Rules

- The **first world** is open by default.
- A **world is locked** if the previous world has not been completed.
- A **world becomes unlocked** only after the previous world is completed.


## World Completion Rules

A world is considered **completed** when:

- All quizzes inside that world are completed.

## Quiz Completion Rules

A quiz is considered **completed** when:

- At least **80% of the answers** are correct.

## Summary Logic

1. World 1 -> Always unlocked.
2. World Num -> Locked until World (Num -1) is completed.
3. A quiz is completed -> When the player scores at least 80% correct answers.
4. A world is completed -> When all its quizzes are completed.