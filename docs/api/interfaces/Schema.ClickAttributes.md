[@puppeteer/replay](../README.md) / [Schema](../modules/Schema.md) / ClickAttributes

# Interface: ClickAttributes

[Schema](../modules/Schema.md).ClickAttributes

## Hierarchy

- **`ClickAttributes`**

  ↳ [`DoubleClickStep`](Schema.DoubleClickStep.md)

  ↳ [`ClickStep`](Schema.ClickStep.md)

## Table of contents

### Properties

- [button](Schema.ClickAttributes.md#button)
- [deviceType](Schema.ClickAttributes.md#devicetype)
- [offsetX](Schema.ClickAttributes.md#offsetx)
- [offsetY](Schema.ClickAttributes.md#offsety)

## Properties

### button

• `Optional` **button**: [`PointerButtonType`](../modules/Schema.md#pointerbuttontype)

Defaults to 'primary' if the device type is a mouse.

#### Defined in

[Schema.ts:82](https://github.com/puppeteer/replay/blob/main/src/Schema.ts#L82)

___

### deviceType

• `Optional` **deviceType**: [`PointerDeviceType`](../modules/Schema.md#pointerdevicetype)

Pointer type for the event. Defaults to 'mouse'.

#### Defined in

[Schema.ts:78](https://github.com/puppeteer/replay/blob/main/src/Schema.ts#L78)

___

### offsetX

• **offsetX**: `number`

in px, relative to the top-left corner of the element content box. Defaults
to the center of the element

#### Defined in

[Schema.ts:87](https://github.com/puppeteer/replay/blob/main/src/Schema.ts#L87)

___

### offsetY

• **offsetY**: `number`

in px, relative to the top-left corner of the element content box. Defaults
to the center of the element

#### Defined in

[Schema.ts:92](https://github.com/puppeteer/replay/blob/main/src/Schema.ts#L92)
