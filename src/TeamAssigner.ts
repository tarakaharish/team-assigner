import { Team, AssignedTeam } from "./Team";
import { Child, ChildWithRules } from "./Child";
import { AssignmentRule } from "./AssignmentRule";
import { AssignmentRuleMapping } from "./AssignmentRuleMapping";
import AssignmentGroup from "./AssignmentGroup";
import getChildWithRules from './ChildWithRulesCreator';
import IdealTeamStats from "./IdealTeamStats";
import Logger from "./Logger";
import createAssignmentGroups from "./ChildGrouper";

export default class TeamAssigner {
    assignTeams(children: Child[], assignableTeams: Team[], assignmentRuleMappings: AssignmentRuleMapping[], eventDate: Date, logger: Logger) {
        const idealTeamStats = this.getIdealTeamStats(assignableTeams, children);
        const childrenWithRules = this.getChildrenWithRules(children, assignableTeams, assignmentRuleMappings, eventDate, logger);
        const groupsWithChildren = this.assignChildrenToGroups(childrenWithRules);
        const teamsWithChildren = this.assignGroupsToTeams(groupsWithChildren, assignableTeams, idealTeamStats);
        return teamsWithChildren;
    }

    private getIdealTeamStats(assignableTeams: Team[], children: Child[]) {
        return new IdealTeamStats;
    }

    private getChildrenWithRules(children: Child[], assignableTeams: Team[], assignmentRuleMappings: AssignmentRuleMapping[], eventDate: Date, logger: Logger) {
        return children.map(child => {
            const otherChildren = children.filter(c => c !== child);
            return getChildWithRules(child, assignmentRuleMappings, otherChildren, assignableTeams, eventDate, logger)
        });
    }

    private assignChildrenToGroups(children: ChildWithRules[]) {
        return createAssignmentGroups(children);
    }

    private assignGroupsToTeams(assignmentGroups: AssignmentGroup[], assignableTeams: Team[], idealTeamStats: IdealTeamStats) {
        // take into account groups that should not be with each other
        return [] as AssignedTeam[];
    }
}