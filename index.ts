import path from 'path';
import Logger from './src/Logger';
import parseTeamsAndTeachers from "./src/data/parseTeamsAndTeachers";
import parseChildrenAndParents from './src/data/parseChildrenAndParents';
import TeamAssigner from './src/TeamAssigner';
import { AssignmentRuleMapping } from './src/AssignmentRuleMapping';

// If this module cannot be found, start by copying assignmentRuleMappings.sample.ts to assignmentRuleMappings.ts and modifying it
import assignmentRuleMappings from './assignmentRuleMappings'; // TODO could also add to this corrections mappings like student last names

const logger = new Logger;
const children = parseChildrenAndParents(path.resolve(__dirname, '..', 'conv reg 2017.xls'), logger);
const teams = parseTeamsAndTeachers(path.resolve(__dirname, '..', 'FBA Team Assignments 2018.xlsx'));
const teamAssigner = new TeamAssigner;
const assignedTeams = teamAssigner.assignTeams(children, teams, assignmentRuleMappings, new Date('2018-04-13'), logger);

// console.log(JSON.stringify(logger.entries, null, 2));
console.log(JSON.stringify(children, null, 2));