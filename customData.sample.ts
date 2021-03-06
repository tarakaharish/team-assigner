import path from 'path';
import * as m from './src/AssignmentRuleMapping';
import { mapping, notes, child, ageAtLeast, ageLessThan, unknownAge, parent, matchAll, matchAny, notMatch } from "./src/AssignmentRuleMapping";
import * as r from './src/AssignmentRule';
import { onTeam, taughtBy, withChild, withChildrenOf, not, any, all } from "./src/AssignmentRule";

export const eventDate = new Date('2018-04-13');
export const ignoreAgeLessThan = 0;
export const ignoreAgeGreaterThan = 14;

export const teamsAndTeachersFilePath = path.resolve(__dirname, '..', 'teamsAndTeachers.xlsx');
export const childParentsFilePath = path.resolve(__dirname, '..', 'childrenAndParents.xls');
export const teamAssignmentsFilePath = path.resolve(__dirname, '..', 'assignedTeams.xlsx');

export const teamsBySpecialRequestOnly = new Set([
    // 'A'
]);

export const fullNameToFirstLastMapping = {
    // 'Full Name': ['First Name', 'Last Name'],
} as {[fullName: string]: [string, string]};

export const childrenToIgnore = matchAny(
    notMatch(matchAny()),
    //  matchAll(child('Jane', 'Doe'), gender(Gender.Unknown), unknownAge, parent('John', 'Doe')),
);

export const assignmentRuleMappings = [
    mapping(notes('If possible, we would like our kids to be on the same team as Jon Doe.  Thank you!'),
        withChild('Jon', 'Doe'))
];