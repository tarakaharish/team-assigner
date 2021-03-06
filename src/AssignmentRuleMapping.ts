import { Child, Gender } from "./Child";
import { Team } from "./Team";
import { RuleBuilder } from "./AssignmentRule";
import AgeOnDate from "./AgeOnDate";

export class AssignmentRuleMapping {
    constructor(
        readonly findCriteria: FindCriteria, 
        readonly rule: RuleBuilder
    ) { }
}

export function mapping(findCriteria: FindCriteria, rule: RuleBuilder) {
    return new AssignmentRuleMapping(findCriteria, rule);
}

export class FindCriteria {
    constructor(private readonly check: (child: Child, ageOnDate: AgeOnDate) => boolean | [boolean, boolean]) {
    }

    /**
     * 
     * @param child 
     * @param ageOnDate 
     * @returns [isApplicable: boolean, wereNotesMatched: boolean] 
     */
    isApplicable(child: Child, ageOnDate: AgeOnDate): [boolean, boolean] {
        const result = this.check(child, ageOnDate);
        return typeof result === 'boolean' ? [result, false] : result;
    }
}

export function notes(notes: string) {
    return new FindCriteria(child => [child.notes === notes, child.notes === notes]);
}

export function child(firstName: string, lastName: string) {
    return new FindCriteria(child => child.firstName === firstName && child.lastName === lastName);
}

export function ageAtLeast(age: number) {
    return new FindCriteria((child, ageOnDate) => !!child.dateOfBirth && ageOnDate.getYears(child.dateOfBirth) >= age);
}

export function ageLessThan(age: number) {
    return new FindCriteria((child, ageOnDate) => !!child.dateOfBirth && ageOnDate.getYears(child.dateOfBirth) < age);
}

export const unknownAge = new FindCriteria(child => !child.dateOfBirth);

export function parent(firstName: string, lastName: string) {
    return new FindCriteria(child => child.parents.names.some(name => name.firstName === firstName && name.lastName === lastName));
}

export function gender(gender: Gender) {
    return new FindCriteria(child => child.gender === gender);
}

export function matchAll(...criteria: FindCriteria[]) {
    return new FindCriteria((child, eventDate) => {
        let areAllApplicable = true;
        let isAnyNotesMatch = false;
        for (const criterion of criteria) {
            const [isApplicable, isNotesMatch] = criterion.isApplicable(child, eventDate);
            areAllApplicable = areAllApplicable && isApplicable;
            isAnyNotesMatch = isAnyNotesMatch || isNotesMatch;
        }
        return [areAllApplicable, areAllApplicable && isAnyNotesMatch];
    });
}

export function matchAny(...criteria: FindCriteria[]) {
    return new FindCriteria((child, eventDate) => {
        let isAnyApplicable = false;
        let isAnyNotesMatch = false;
        for (const criterion of criteria) {
            const [isApplicable, isNotesMatch] = criterion.isApplicable(child, eventDate);
            isAnyApplicable = isAnyApplicable || isApplicable;
            isAnyNotesMatch = isAnyNotesMatch || isNotesMatch;
            if (isAnyApplicable && isAnyNotesMatch) {
                break;
            }
        }
        return [criteria.length < 1 || isAnyApplicable, isAnyNotesMatch];
    });
}

export function notMatch(criterion: FindCriteria) {
    return new FindCriteria((child, eventDate) => ! criterion.isApplicable(child, eventDate)[0]);
}


