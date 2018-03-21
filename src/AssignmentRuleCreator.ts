import Child from "./Child";
import AssignmentRuleMapping from "./AssignmentRuleMapping";
import Team from "./Team";
import AssignmentRule from "./AssignmentRule";

export default function createAssignmentRules(child: Child, assignmentRuleMappings: AssignmentRuleMapping[], otherChildren: Child[], assignableTeams: Team[]) {
    const assignmentRules: AssignmentRule[] = [];
    const childrenInvolvedInRules: Child[] = [];

    let remainingNotes = child.notes;
    let foundMatch = true;

    while (foundMatch && remainingNotes.trim().length > 0) {
        foundMatch = false;
        for (const mapping of assignmentRuleMappings) {
            if (mapping.appliesTo(child, remainingNotes)) {
                foundMatch = true;
                remainingNotes = mapping.addRules(assignmentRules, remainingNotes, otherChildren, assignableTeams, childrenInvolvedInRules);
                break;
            }
        }
    }

    child.findSiblings(otherChildren)
        .filter(sibling => ! childrenInvolvedInRules.includes(sibling))
        .forEach(sibling => assignmentRules.push(AssignmentRule.withChild(sibling)));

    return assignmentRules;
}