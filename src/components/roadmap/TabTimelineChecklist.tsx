import React from 'react';
import { Calendar, CheckSquare, Square, CheckCircle2, Clock, ListTodo } from 'lucide-react';
import { BusinessIdea, LaunchTask } from '../../types';
import { useRoadmap } from '../../context/RoadmapContext';

interface TabTimelineChecklistProps {
  idea: BusinessIdea;
}

export const TabTimelineChecklist: React.FC<TabTimelineChecklistProps> = ({ idea }) => {
  const { isTaskCompleted, toggleTaskCompleted } = useRoadmap();

  // Calculate completion percentage
  const totalTasks = idea.launchTasks.length;
  const completedCount = idea.launchTasks.filter((t) =>
    isTaskCompleted(idea.id, t.id, t.completed)
  ).length;
  const progressPercent = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  // Group tasks by phase
  const phases = Array.from(new Set(idea.launchTasks.map((t) => t.phase)));

  return (
    <div className="space-y-8">
      
      {/* Launch Readiness Progress Banner */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <ListTodo className="h-5 w-5 text-emerald-600" />
              <span>Interactive Launch Execution Checklist</span>
            </h2>
            <p className="text-xs text-zinc-500 mt-1">
              Mark off operational milestones as you prepare for commercial deployment.
            </p>
          </div>

          <div className="shrink-0 text-right">
            <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              {completedCount} of {totalTasks} Completed
            </span>
            <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {progressPercent}% Ready
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
          <div
            className="h-full bg-emerald-500 transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Phased Execution Roadmap */}
      <div className="space-y-6">
        {phases.map((phaseName, pIdx) => {
          const phaseTasks = idea.launchTasks.filter((t) => t.phase === phaseName);

          return (
            <div
              key={pIdx}
              className="rounded-2xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs"
            >
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-100 pb-3 mb-4 dark:border-zinc-800 flex items-center justify-between">
                <span>{phaseName}</span>
                <span className="text-xs font-semibold text-zinc-400">
                  {phaseTasks.length} Milestones
                </span>
              </h3>

              <div className="space-y-2.5">
                {phaseTasks.map((task) => {
                  const completed = isTaskCompleted(idea.id, task.id, task.completed);

                  return (
                    <button
                      key={task.id}
                      onClick={() => toggleTaskCompleted(idea.id, task.id)}
                      className={`w-full text-left flex items-start justify-between gap-3 rounded-xl border p-3.5 transition-all ${
                        completed
                          ? 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/50 dark:bg-emerald-950/20'
                          : 'border-zinc-200/80 bg-zinc-50/40 hover:bg-zinc-100/60 dark:border-zinc-800 dark:bg-zinc-800/30 dark:hover:bg-zinc-800/60'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 shrink-0">
                          {completed ? (
                            <CheckSquare className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                          ) : (
                            <Square className="h-4 w-4 text-zinc-400" />
                          )}
                        </div>

                        <div>
                          <span
                            className={`text-xs font-bold block ${
                              completed
                                ? 'text-emerald-950 line-through dark:text-emerald-200'
                                : 'text-zinc-900 dark:text-zinc-100'
                            }`}
                          >
                            {task.title}
                          </span>
                          <span className="text-[11px] text-zinc-500 font-medium">
                            Category: {task.category}
                          </span>
                        </div>
                      </div>

                      <span className="shrink-0 text-[10px] font-semibold text-zinc-500 bg-white dark:bg-zinc-800 px-2 py-1 rounded-md border border-zinc-200 dark:border-zinc-700">
                        Week {task.week}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
