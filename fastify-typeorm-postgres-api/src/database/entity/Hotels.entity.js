"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hotel = void 0;
var typeorm_1 = require("typeorm");
var Hotel = /** @class */ (function () {
    function Hotel() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid")
    ], Hotel.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255 })
    ], Hotel.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 500 })
    ], Hotel.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 255 })
    ], Hotel.prototype, "urlImage", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)()
    ], Hotel.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)()
    ], Hotel.prototype, "updated_at", void 0);
    Hotel = __decorate([
        (0, typeorm_1.Entity)({ name: "hotels" })
    ], Hotel);
    return Hotel;
}());
exports.Hotel = Hotel;
