"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

type Team = {
  id: string;
  name: string;
  members: number;
};

const initialTeams: Team[] = [
  { id: "1", name: "Hack Masters", members: 8 },
  { id: "2", name: "Code Warriors", members: 5 },
  { id: "3", name: "Bug Smashers", members: 12 },
  { id: "4", name: "AI Pioneers", members: 6 },
  { id: "5", name: "Frontend Ninjas", members: 9 },
];

export default function TeamManagement() {
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [teamName, setTeamName] = useState("");

  const createTeam = () => {
    if (!teamName.trim()) return;
    const newTeam: Team = {
      id: String(teams.length + 1),
      name: teamName,
      members: 1, // Creator is the first member
    };
    setTeams([...teams, newTeam]);
    setTeamName("");
  };

  return (
    <div className="pt-20 max-w-6xl mx-auto bg-black text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Available Teams</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Plus size={18} /> Create Team
            </Button>
          </DialogTrigger>
          <DialogContent className="p-6 bg-gray-900 bg-white text-black rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Create a New Team</h3>
            <Input
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter team name"
            />
            <Button onClick={createTeam} className="w-full mt-4">
              Create Team
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      {/* Team Cards Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {teams.map((team) => (
          <Card key={team.id} className="bg-gray-800 text-white">
            <CardHeader>
              <CardTitle>{team.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <p className="text-gray-400">Members: {team.members}</p>
              <Button size="sm" variant="secondary">
                Join
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
