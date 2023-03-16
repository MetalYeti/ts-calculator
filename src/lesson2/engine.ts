import { ParsedLineType } from "./parser";
import { isNumber } from "./helpers";
import {
  mathOperators,
  mathPriorities,
  mathOperatorsPriorities,
} from "./mathOperators";

export const topPrioritiesCalc = (stack: ParsedLineType, currentPriority: number): ParsedLineType =>
  stack.reduce<ParsedLineType>((result, nextItem) => {
    const prevItem = result[result.length - 2];
    const item = result[result.length - 1];

    if (!isNumber(String(item)) && mathOperatorsPriorities[item] === currentPriority) {
      if (!mathOperators[item]) {
        throw new TypeError("Unexpected stack!");
      }
      result = [
        ...result.slice(0, -2),
        mathOperators[item](Number(prevItem), Number(nextItem)),
      ];
    } else {
      result.push(nextItem);
    }
    return result;
  }, []);

export const lowestPriorityCalc = (stack: ParsedLineType, currentPriority: number): number =>
  stack.reduce<number>((result, nextItem, key) => {
    const item = stack[key - 1];

    if (mathOperatorsPriorities[item] && mathOperatorsPriorities[item] !== currentPriority) {
      throw new TypeError("Unexpected stack!");
    }

    if (!isNumber(String(item)) && mathOperatorsPriorities[item] === currentPriority) {
      result = mathOperators[item](Number(result), Number(nextItem));
    }
    return result;
  }, Number(stack[0]));

  export const priorityChainExecutor = (stack: ParsedLineType): number => {
    const LAST_PRIORITY = mathPriorities[mathPriorities.length - 1];
    let prioritiesResult: ParsedLineType = stack;
    let result: number = 0;

    for (let priority of mathPriorities) {
      if (priority === LAST_PRIORITY){
         result = lowestPriorityCalc(prioritiesResult, priority);
      } else {
        prioritiesResult = topPrioritiesCalc(prioritiesResult, priority);
      }
    }
    return result;
  }
