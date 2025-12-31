import {signal} from "@preact/signals-core";
import {WIDTH} from "../../constants/constants.js";

export const SIGNALS = {
    bagX: signal(WIDTH/2),
    lives: signal(5),
    score: signal(0),
}