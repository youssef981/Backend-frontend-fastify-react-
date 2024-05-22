"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hotel = void 0;
var typebox_1 = require("@sinclair/typebox");
exports.Hotel = typebox_1.Type.Object({
    name: typebox_1.Type.String(),
    description: typebox_1.Type.String(),
    urlImage: typebox_1.Type.String(),
});
