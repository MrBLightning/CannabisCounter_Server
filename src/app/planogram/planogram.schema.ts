import * as Joi from '@hapi/joi';

// UI models
export const PlanogramElementId = Joi.string();

export const PlacementObject = Joi.object({
    faces: Joi.number().required().default(1),
    stack: Joi.number().required().default(1),
    row: Joi.number().required().default(1)
});
export const DimensionObject = Joi.object({
    width: Joi.number().required(),
    height: Joi.number().required(),
    depth: Joi.number().required()
});


export const ShelfItemSchema = Joi.object({
    id: PlanogramElementId.required(),
    placement: PlacementObject.required(),
    product: Joi.number().required()
});
export const ShelfSchema = Joi.object({
    id: PlanogramElementId.required(),
    dimensions: DimensionObject.required(),
    name: Joi.string(),
    items: Joi.array().items(ShelfItemSchema).required()
})
export const SectionSchema = Joi.object({
    id: PlanogramElementId.required(),
    dimensions: DimensionObject.required(),
    name: Joi.string(),
    shelves: Joi.array().items(ShelfSchema).required()
})
export const AisleSchema = Joi.object({
    id: PlanogramElementId.required(),
    name: Joi.string(),
    dimensions: DimensionObject.required(),
    aisle_id: Joi.number().required(),
    aisle_number: Joi.number().required(),
    index: Joi.number(),
    sections: Joi.array().items(SectionSchema).required()
})
export const StoreSchema = Joi.object({
    store_id: Joi.number().required(),
    name: Joi.string(),
    branch_id: Joi.number().required(),
    aisle_counter: Joi.number().required(),
    aisles: Joi.array().items(AisleSchema).required()
})