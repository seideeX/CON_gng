# Pageant Scoring System Documentation

## Overview
This document explains how the scoring system works across all phases of the pageant competition.

## Competition Phases

### Phase 1: Top Five Selection
**Purpose**: Select the top 5 male and top 5 female candidates from all participants.

**Categories** (Each worth 100 points):
1. Evening Gown
   - Elegance & Poise: 30 points
   - Stage Presence: 25 points
   - Suitability of Gown: 20 points
   - Projection & Expression: 15 points
   - Overall Impact: 10 points

2. Production Number
   - Energy & Performance: 30 points
   - Mastery of Choreography: 25 points
   - Stage Presence: 20 points
   - Facial Expression: 15 points
   - Overall Impact: 10 points

3. Casual Wear
   - Style & Fashion: 30 points
   - Confidence & Bearing: 25 points
   - Suitability & Coordination: 20 points
   - Personality Projection: 15 points
   - Overall Impression: 10 points

4. Swimsuit
   - Body Proportion: 30 points
   - Confidence & Stage Presence: 25 points
   - Walk & Bearing: 20 points
   - Poise & Composure: 15 points
   - Overall Appeal: 10 points

**Scoring**: Each category is scored independently. The top 5 males and top 5 females advance to Phase 2.

---

### Phase 2: Preliminary Round (Top 5 Only)
**Purpose**: Evaluate the top 5 candidates in each gender category.

**Criteria** (Total: 100 points):
1. Beauty: 30 points
2. Poise & Composure: 20 points
3. Wit: 50 points

**Important**: This preliminary score will carry 50% weight into the category rounds (Evening Gown, Casual Wear, Swimsuit, Production Number) when scored again for the top 5.

---

### Phase 3: Category Rounds with Preliminary Weight (Top 5 Only)
**Purpose**: Re-evaluate top 5 candidates in the same categories with preliminary influence.

**Scoring Formula**:
```
Final Category Score = (Category Score × 50%) + (Preliminary Round Score × 50%)
```

**Example**:
- Judge scores 85 in Evening Gown
- Same judge scored 90 in Preliminary Round
- Final Evening Gown Score = (85 × 0.5) + (90 × 0.5) = 42.5 + 45 = 87.5

This applies to:
- Evening Gown
- Production Number
- Casual Wear
- Swimsuit

---

### Phase 4: Final Round (Top 5 Only)
**Purpose**: Final evaluation to determine the winner.

**Criteria** (Total: 100 points):
1. Intelligence & Depth of Answer: 40 points
2. Communication Skills: 25 points
3. Stage Presence & Confidence: 20 points
4. Overall Impact: 15 points

**Important**: Final round starts at ZERO. No preliminary scores are carried over. This is a fresh evaluation.

---

## Database Structure

### Tables

1. **candidates**: All pageant candidates
2. **top_five_candidates**: Links candidates who made it to top 5
3. **top_five_selection_scores**: Scores for Phase 1 (all candidates)
4. **top_five_scores**: Scores for Phase 2 & 4 (preliminary and final rounds)

### Score Storage

**top_five_selection_scores**:
- `evening_gown` (JSON): Sub-criteria scores
- `evening_gown_total` (decimal): Sum of sub-criteria
- `production_number`, `production_number_total`
- `casual_wear`, `casual_wear_total`
- `swimsuit`, `swimsuit_total`
- `total_scores`: Grand total with preliminary weighting applied

**top_five_scores**:
- `preliminary_round` (JSON): Sub-criteria scores
- `preliminary_round_total` (decimal): Sum of sub-criteria
- `final_round` (JSON): Sub-criteria scores
- `final_round_total` (decimal): Sum of sub-criteria
- `total_score`: Sum of both rounds (no weighting between them)

---

## Implementation Details

### Weighting Logic

**TopFiveSelectionScoreRepository**:
- When saving category scores, automatically applies 50% preliminary weight
- Retrieves preliminary score from `top_five_scores` table
- Calculates: `(category_score × 0.5) + (preliminary_score × 0.5)`

**TopFiveFinalistScoreRepository**:
- Preliminary and Final rounds are independent
- No weighting applied between them
- Total = preliminary_total + final_total

### Service Layer

**TopFiveSelectionService**:
- `getResultsPerCategory()`: Returns weighted scores per category
- `getTopFiveSelectionResults()`: Returns total weighted scores across all categories
- Applies preliminary weighting when displaying results

**TopFiveService**:
- `getResultsPerCategory()`: Returns scores for preliminary or final round
- `getTotalResults()`: Returns combined totals (preliminary + final)
- No weighting between preliminary and final

---

## Key Points

1. ✅ Preliminary scores carry 50% weight into category rounds (Evening Gown, etc.)
2. ✅ Final round starts at zero (no preliminary weight)
3. ✅ Each judge scores independently
4. ✅ Weighting is applied automatically during score calculation
5. ✅ Results display the weighted scores, not raw scores

---

## Testing the System

To verify the scoring system works correctly:

1. **Test Preliminary Weight**:
   - Score a candidate 100 in Preliminary Round
   - Score same candidate 80 in Evening Gown
   - Expected Evening Gown result: (80 × 0.5) + (100 × 0.5) = 90

2. **Test Final Round Independence**:
   - Score a candidate 100 in Preliminary Round
   - Score same candidate 60 in Final Round
   - Expected total: 100 + 60 = 160 (no weighting)

3. **Test Non-Top-5 Candidates**:
   - Candidates not in top 5 should have 0 preliminary weight
   - Their category scores should be: (category_score × 0.5) + 0 = category_score × 0.5
