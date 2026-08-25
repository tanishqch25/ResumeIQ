import React from "react";
import { useAnalysis } from "../../hooks/useAnalysis";
import { RecommendationGroup } from "../../components/dashboard/recommendations/RecommendationCard";
import { EmptyState } from "../../components/shared/EmptyState";

export default function RecommendationsPage() {
  const { analysis } = useAnalysis();
  const { recommendations } = analysis;
  const totalCount = (recommendations.high?.length ?? 0) +
                     (recommendations.medium?.length ?? 0) +
                     (recommendations.optional?.length ?? 0);

  if (!totalCount) {
    return (
      <EmptyState
        heading="No recommendations available"
        description="Your resume scored well across all categories. Check back after re-analyzing with an updated resume."
      />
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-h1 font-semibold text-text">Recommendations</h1>
        <p className="text-body text-muted mt-1 max-w-xl">
          {totalCount} specific improvements, organized by impact. Work through High Priority items first.
        </p>
      </div>

      {/* [21ST_COMPONENT_SLOT: RECOMMENDATION_CARDS] */}
      <RecommendationGroup
        title="High Priority"
        items={recommendations.high}
        priority="high"
      />
      <RecommendationGroup
        title="Medium Priority"
        items={recommendations.medium}
        priority="medium"
      />
      <RecommendationGroup
        title="Optional Polish"
        items={recommendations.optional}
        priority="optional"
      />
    </div>
  );
}
