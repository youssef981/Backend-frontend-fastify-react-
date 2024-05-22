"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureRoutes = void 0;
var Hotels_entity_1 = require("../database/entity/Hotels.entity");
function configureRoutes(server) {
    var _this = this;
    server.get("/", function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
        var hotelRepository, hotels;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    hotelRepository = server.orm["typeorm"].getRepository(Hotels_entity_1.Hotel);
                    return [4 /*yield*/, hotelRepository.find()];
                case 1:
                    hotels = _a.sent();
                    reply.code(200).send({ success: true, data: { hotels: hotels } });
                    return [2 /*return*/];
            }
        });
    }); });
    server.post("/api/hotels", {
        preValidation: function (request, reply, done) {
            var _a = request.body, name = _a.name, description = _a.description, urlImage = _a.urlImage;
            done(name.length < 2
                ? new Error("Name must be more than 2 characters")
                : undefined);
        },
    }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
        var _a, name, description, urlImage, hotel, hotelRepository, result, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = request.body, name = _a.name, description = _a.description, urlImage = _a.urlImage;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    hotel = new Hotels_entity_1.Hotel();
                    hotel.name = name;
                    hotel.description = description;
                    hotel.urlImage = urlImage;
                    hotelRepository = server.orm["typeorm"].getRepository(Hotels_entity_1.Hotel);
                    return [4 /*yield*/, hotelRepository.save(hotel)];
                case 2:
                    result = _b.sent();
                    reply.status(201).send({
                        success: true,
                        data: {
                            hotels: [result],
                        },
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    reply.code(400).send({ error: error_1 });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    server.get("/api/hotels", {
        preValidation: function (request, reply, done) {
            var id = request.query.id;
            done(id === "" || undefined
                ? new Error("Please provide the id")
                : undefined);
        },
    }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
        var id, hotelRepository, hotel, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = request.query.id;
                    hotelRepository = server.orm["typeorm"].getRepository(Hotels_entity_1.Hotel);
                    return [4 /*yield*/, hotelRepository.findOne({ where: { id: id } })];
                case 1:
                    hotel = _a.sent();
                    if (!hotel) {
                        reply.code(404).send({ error: "Hotel not found" });
                    }
                    else {
                        reply.code(200).send({
                            success: true,
                            data: {
                                hotels: [hotel],
                            },
                        });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    reply.code(400).send({ error: error_2 });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    server.delete("/api/hotels", function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
        var id, hotelRepository, hotel;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = request.query.id;
                    hotelRepository = server.orm["typeorm"].getRepository(Hotels_entity_1.Hotel);
                    return [4 /*yield*/, hotelRepository.findOne({ where: { id: id } })];
                case 1:
                    hotel = _a.sent();
                    if (!!hotel) return [3 /*break*/, 2];
                    reply.code(404).send({ error: "Hotel not found" });
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, hotelRepository.remove(hotel)];
                case 3:
                    _a.sent();
                    reply.code(200).send({ success: true });
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); });
    server.put("/api/hotels", function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
        var id, _a, name, description, urlImage, hotelRepository, hotel;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = request.query.id;
                    _a = request.body, name = _a.name, description = _a.description, urlImage = _a.urlImage;
                    hotelRepository = server.orm["typeorm"].getRepository(Hotels_entity_1.Hotel);
                    return [4 /*yield*/, hotelRepository.findOne({ where: { id: id } })];
                case 1:
                    hotel = _b.sent();
                    if (!!hotel) return [3 /*break*/, 2];
                    reply.code(404).send({ error: "Hotel not found" });
                    return [3 /*break*/, 4];
                case 2:
                    hotel.name = name;
                    hotel.description = description;
                    hotel.urlImage = urlImage;
                    return [4 /*yield*/, hotelRepository.save(hotel)];
                case 3:
                    _b.sent();
                    reply.code(200).send({
                        success: true,
                        data: {
                            hotels: [hotel],
                        },
                    });
                    _b.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); });
}
exports.configureRoutes = configureRoutes;
