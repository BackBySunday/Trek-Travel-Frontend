import { StatIcon } from "../OperatorIcons";
import type { Operator, OperatorReview } from "../OperatorProfileSection";

const distribution = [78, 15, 4, 2, 1];

export default function ReviewsPanel({
  operator,
  reviews,
}: {
  operator: Operator;
  reviews: OperatorReview[];
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div>
        <div className="flex h-full flex-col gap-4 rounded-[20px] border border-[#E5E5E5] bg-[#F6F7F7] p-7">
          <div className="flex items-end gap-3">
            <span className="font-urbanist text-5xl font-medium leading-none text-[#101010]">
              {operator.rating.toFixed(1)}
            </span>
            <span className="pb-1 font-urbanist text-sm text-[#666]">
              {operator.reviewCount} reviews
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            {distribution.map((pct, index) => (
              <div key={pct} className="flex items-center gap-2">
                <span className="w-3 font-urbanist text-xs text-[#8E8E8E]">
                  {5 - index}
                </span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#E5E5E5]">
                  <span
                    className="block h-full rounded-full bg-[#FEB531]"
                    style={{ width: `${pct}%` }}
                  />
                </span>
                <span className="w-8 text-right font-urbanist text-xs text-[#8E8E8E]">
                  {pct}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {reviews.map((review) => (
        <div key={review.name}>
          <figure className="flex h-full flex-col gap-3 rounded-[20px] border border-[#E5E5E5] bg-[#F6F7F7] p-6">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#1A1A17] font-urbanist text-sm text-white">
                {review.name[0]}
              </span>
              <div>
                <p className="font-urbanist text-sm font-medium text-[#101010]">
                  {review.name}
                </p>
                <p className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span
                      key={index}
                      className={
                        index < review.stars ? "text-[#FEB531]" : "text-[#D7D7D7]"
                      }
                    >
                      <StatIcon icon="star" />
                    </span>
                  ))}
                </p>
              </div>
              <span className="ml-auto font-urbanist text-xs text-[#8E8E8E]">
                {review.daysAgo}d ago
              </span>
            </div>
            <blockquote className="font-urbanist text-sm leading-relaxed text-[#666]">
              {review.text}
            </blockquote>
            <figcaption className="mt-auto font-urbanist text-xs text-[#8E8E8E]">
              on {review.trek}
            </figcaption>
          </figure>
        </div>
      ))}
    </div>
  );
}
