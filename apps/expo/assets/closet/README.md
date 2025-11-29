# Closet Assets

This folder contains images and assets for the SkateHubba closet/avatar customization system.

## Required Assets

### Background
- `shop-interior.jpg` - Background image for the closet screen (skate shop interior vibe)

### Item Categories

Create subfolders for each category with item images:

```
closet/
├── shop-interior.jpg
├── tops/
│   ├── plain_tee.png
│   ├── hoodie.png
│   └── jacket.png
├── bottoms/
│   ├── jeans.png
│   ├── shorts.png
│   └── joggers.png
├── decks/
│   ├── classic_deck.png
│   ├── street_deck.png
│   └── cruiser_deck.png
├── trucks/
│   ├── standard_trucks.png
│   └── hollow_trucks.png
├── wheels/
│   ├── street_wheels.png
│   └── cruiser_wheels.png
├── bearings/
│   ├── abec_7.png
│   └── abec_9.png
├── hardware/
│   ├── allen_bolts.png
│   └── phillips_bolts.png
└── stickers/
    ├── brand_sticker.png
    └── custom_sticker.png
```

## Image Specifications

- **Format**: PNG with transparency preferred
- **Size**: 512x512px for item icons
- **Background**: 1080x1920px (portrait) for shop-interior

## Adding New Items

1. Add image file to appropriate category folder
2. Update item data in Firestore/API
3. Item ID should match filename (without extension)
