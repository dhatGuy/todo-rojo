import { Button } from "@repo/ui/components/button";
import { Card, CardContent } from "@repo/ui/components/card";
import { Input } from "@repo/ui/components/input";
import { Progress } from "@repo/ui/components/progress";
import { cn } from "@repo/ui/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getAvailableTasksQueryOptions } from "src/queries/tasks.queries";
import PokerChip from "../../assets/icons/poker-chip";

export const Route = createFileRoute("/dashboard/tasks")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useQuery(getAvailableTasksQueryOptions());

  return (
    <div className="flex flex-col min-h-screen gap-12">
      <Card className="bg-dark-blue w-full rounded-lg md:rounded-full p-3 sm:p-4">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
            <h3 className="text-xs sm:text-sm text-gray-400">Nivel 3</h3>
            <Progress
              value={75}
              className="h-1.5 sm:h-2 md:h-3 bg-gray-700 w-full sm:flex-1"
            />
            <span className="text-gray-400 text-xs sm:text-sm">
              75% completado
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4">
        {/* Chips Balance */}
        <div className="flex-1 md:col-span-2 bg-dark-blue backdrop-blur-lg border border-white/10 rounded-4xl p-4 sm:p-6 flex flex-col justify-center hover:transform hover:-translate-y-1 transition-all duration-200">
          <h2 className="text-gray-400 text-lg sm:text-xl font-medium mb-3 sm:mb-4">
            Chips Balance
          </h2>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-15 sm:h-15 rounded-full flex items-center justify-center relative">
              <PokerChip color="red" width={undefined} height={undefined} />
            </div>
            <span className="text-4xl sm:text-6xl font-bold text-white">0</span>
          </div>
        </div>

        <Card className="bg-dark-blue rounded-4xl">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-start justify-between mb-4 gap-4">
              <div className="flex items-center space-x-3">
                <div>
                  <h3 className="text-white font-medium flex items-center space-x-2">
                    <span>{tasks[0]?.title}</span>
                    <span
                      // variant="secondary"
                      className="text-yellow-400"
                    >
                      +{tasks[0]?.chips} RC
                    </span>
                    <div className="rounded-full flex items-center justify-center">
                      <PokerChip color="red" width={20} height={20} />
                    </div>
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {tasks[0]?.description}
                  </p>
                </div>
              </div>

              <Button
                // onClick={() => handleCompleteTask(tasks[0].id)}
                disabled={tasks[0]?.completed}
                variant={tasks[0]?.completed ? "secondary" : "primary"}
                className={cn(
                  tasks[0]?.completed
                    ? "bg-gray-600 text-gray-300"
                    : "rojo-gradient text-black font-bold hover:opacity-80",
                  "text-md p-5 rounded-xl w-full sm:w-auto",
                )}
                size="sm"
              >
                {tasks[0]?.completed ? "Terminado" : "Completo"}
              </Button>
            </div>

            {tasks[0]?.hasInput && !tasks[0].completed && (
              <Input
                defaultValue={tasks[0].inputPlaceholder}
                readOnly
                className="border-gray-600 bg-[#11172f] py-6 rounded-xl text-white placeholder-gray-400"
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {data?.data.slice(1).map((task) => (
          <Card key={task.id} className="bg-dark-blue rounded-4xl">
            <CardContent className="p-6">
              <div className="flex flex-wrap items-start justify-between mb-4 gap-4">
                <div className="flex items-center space-x-3">
                  <div>
                    <h3 className="text-white font-medium flex items-center space-x-2">
                      <span>{task.name}</span>
                      <span
                        // variant="secondary"
                        className="text-yellow-400"
                      >
                        +{task.defaultChips} RC
                      </span>
                      <div className="rounded-full flex items-center justify-center">
                        <PokerChip color="red" width={20} height={20} />
                      </div>
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      {task.description}
                    </p>
                  </div>
                </div>

                <Button
                  // onClick={() => handleCompleteTask(task.id)}
                  // disabled={task.completed}
                  // variant={task.completed ? "secondary" : "primary"}
                  className={cn(
                    !task.active
                      ? "bg-gray-600 text-gray-300"
                      : "rojo-gradient text-black font-bold hover:opacity-80",
                    "text-md p-5 rounded-xl w-full sm:w-auto",
                  )}
                  size="sm"
                >
                  {!task.active ? "Terminado" : "Completo"}
                </Button>
              </div>

              {/* {task.hasInput && !task.completed && (
                <Input
                  defaultValue={task.inputPlaceholder}
                  readOnly
                  className="border-gray-600 bg-[#11172f] py-6 rounded-xl text-white placeholder-gray-400"
                />
              )} */}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

const tasks = [
  {
    id: 1,
    title: "💬 Daily Login",
    description:
      "Comparte tu link con amigos y gana Red Chips cuando depositen",
    chips: 300,
    type: "daily",
    completed: true,
    hasInput: false,
  },
  {
    id: 2,
    title: "💬 Invita y gana",
    description:
      "Comparte tu link con amigos y gana Red Chips cuando depositen",
    chips: 300,
    type: "referral",
    completed: false,
    hasInput: true,
    inputPlaceholder: "https://todoalrojo.cl/invite/tuusuario",
  },
  {
    id: 3,
    title: "💬 Invita y gana",
    description:
      "Comparte tu link con amigos y gana Red Chips cuando depositen",
    chips: 300,
    type: "referral",
    completed: false,
    hasInput: true,
    inputPlaceholder: "https://todoalrojo.cl/invite/tuusuario",
  },
  {
    id: 4,
    title: "💬 Invita y gana",
    description:
      "Comparte tu link con amigos y gana Red Chips cuando depositen",
    chips: 300,
    type: "referral",
    completed: false,
    hasInput: true,
    inputPlaceholder: "https://todoalrojo.cl/invite/tuusuario",
  },
];
