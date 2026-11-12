// Vendor data. Add or edit vendors here; nothing else needs to change.
const CATEGORIES = {
    venue: {
      label: "Venue", min: 2000, max: 20000, step: 500, start: 8000,
      vendors: [
        { name: "Maple Hollow Barn", price: 3200, capacity: 120, blurb: "Rustic indoor/outdoor barn venue, seats up to 120." },
        { name: "Riverside Grange", price: 4100, capacity: 100, blurb: "Converted grange hall on the water, seats up to 100." },
        { name: "The Ivy Terrace", price: 7400, capacity: 150, blurb: "Garden courtyard with covered pavilion, seats up to 150." },
        { name: "Oakview Vineyard", price: 8900, capacity: 130, blurb: "Working vineyard with tasting room reception space." },
        { name: "Aldergate Hall", price: 11800, capacity: 200, blurb: "Historic ballroom downtown, full catering kitchen included." },
        { name: "The Kestrel Loft", price: 13200, capacity: 180, blurb: "Exposed-brick industrial loft, rooftop cocktail space." },
        { name: "Cliffside Estate", price: 16500, capacity: 150, blurb: "Oceanview private estate, all-inclusive weekend rental." },
        { name: "Windmere Manor", price: 18700, capacity: 250, blurb: "Restored manor house, formal gardens, on-site lodging." }
      ]
    },
    catering: {
      label: "Catering", min: 1500, max: 18000, step: 500, start: 6500,
      vendors: [
        { name: "Harvest & Hearth", price: 2800, capacity: 100, blurb: "Buffet-style, farm-to-table menu, 100 guests." },
        { name: "Copper Kettle Kitchen", price: 3600, capacity: 120, blurb: "Family-style comfort food, 120 guests." },
        { name: "Rosemary Table Co.", price: 5900, capacity: 130, blurb: "Plated dinner service with vegetarian and gluten-free menus." },
        { name: "Basil & Bloom Catering", price: 7100, capacity: 150, blurb: "Mediterranean-inspired buffet with live action stations." },
        { name: "Salt & Vine Catering", price: 9200, capacity: 150, blurb: "Family-style service with a curated wine pairing." },
        { name: "The Butcher's Table", price: 10400, capacity: 180, blurb: "Plated multi-course dinner, dedicated sommelier." },
        { name: "The Gilded Fork", price: 13500, capacity: 200, blurb: "Full-service fine dining, chef's tasting menu." },
        { name: "Maison Noir Catering", price: 16200, capacity: 220, blurb: "White-glove service, custom menu design, 5-course dinner." }
      ]
    },
    photography: {
      label: "Photography", min: 800, max: 10000, step: 100, start: 3200,
      vendors: [
        { name: "Ava Lane Photography", price: 1450, blurb: "8-hour coverage, 1 shooter, online gallery." },
        { name: "Golden Hour Studio", price: 1950, blurb: "8-hour coverage, 1 shooter, same-week sneak peek." },
        { name: "Northfield Studio", price: 2900, blurb: "10-hour coverage, 2 shooters, engagement session included." },
        { name: "Willow & Light", price: 3700, blurb: "10-hour coverage, 2 shooters, film + digital hybrid." },
        { name: "Wren & Co.", price: 4600, blurb: "Full-day coverage, second shooter, same-day preview edits." },
        { name: "Hazel Grove Photo", price: 5800, blurb: "Full-day coverage, drone add-on, custom-bound album." },
        { name: "Marlowe Editorial", price: 7200, blurb: "Editorial-style full weekend coverage, printed album included." },
        { name: "Atelier Lumen", price: 9100, blurb: "Multi-day coverage, two photographers, fine-art prints." }
      ]
    },
    florals: {
      label: "Florals & decor", min: 500, max: 8000, step: 100, start: 2100,
      vendors: [
        { name: "Petal & Pine", price: 950, capacity: 80, blurb: "Bouquets, boutonnieres, and simple ceremony arch florals." },
        { name: "Sparrow & Stem", price: 1400, capacity: 100, blurb: "Bouquets plus reception centerpieces for up to 10 tables." },
        { name: "The Wildflower Room", price: 2200, capacity: 120, blurb: "Full ceremony and reception florals, seasonal blooms." },
        { name: "Honeybloom Design", price: 2900, capacity: 130, blurb: "Garden-style arrangements with hanging installations." },
        { name: "Bloom & Bough", price: 3900, capacity: 150, blurb: "Large-scale installations, custom arch, table runners." },
        { name: "Fern & Fable", price: 4800, capacity: 170, blurb: "Whimsical florals with foraged greenery, full tablescapes." },
        { name: "Ateliér Fleur", price: 6100, capacity: 200, blurb: "Luxury design, imported blooms, full venue transformation." },
        { name: "The Botanist's Table", price: 7400, capacity: 220, blurb: "Editorial-grade floral art direction, ceiling installations." }
      ]
    },
    music: {
      label: "Music", min: 500, max: 7000, step: 100, start: 1800,
      vendors: [
        { name: "DJ Marcus Reyes", price: 850, blurb: "5-hour DJ set, MC services, basic sound system." },
        { name: "Echo Lane DJs", price: 1300, blurb: "6-hour DJ set, uplighting package, wireless mics." },
        { name: "Late Bloom Trio", price: 1900, blurb: "Live acoustic trio for ceremony and cocktail hour." },
        { name: "Cardinal Strings Quartet", price: 2600, blurb: "String quartet for ceremony plus dinner background sets." },
        { name: "The River Road Band", price: 3400, blurb: "6-piece live band, full reception, dance-floor lighting." },
        { name: "Northlight Collective", price: 4500, blurb: "8-piece live band with horn section, MC included." },
        { name: "Solstice Sound Collective", price: 5600, blurb: "DJ + live horn section, custom setlist consultation." },
        { name: "The Fairview Orchestra", price: 6700, blurb: "12-piece orchestra, full evening of live music." }
      ]
    },
    attire: {
      label: "Attire", min: 300, max: 6000, step: 100, start: 1600,
      vendors: [
        { name: "Thistle & Thread", price: 650, blurb: "Off-the-rack gown rental with alterations included." },
        { name: "Marlow & Grey Suiting", price: 950, blurb: "Rental suit for two, tailored fittings included." },
        { name: "Birchwood Bridal", price: 1500, blurb: "Made-to-order gown, one fitting, accessories included." },
        { name: "Camden & Row Suiting", price: 2200, blurb: "Custom suit for two, two fittings included." },
        { name: "Ivory Row Bridal", price: 2800, blurb: "Designer sample gown, custom alterations, veil included." },
        { name: "The Groom's Quarter", price: 3500, blurb: "Fully custom tuxedo for the wedding party, up to 6." },
        { name: "Atelier Noor", price: 4700, blurb: "Fully custom gown and suit, hand finishing." },
        { name: "Maison Vale Couture", price: 5600, blurb: "Bespoke gown design, multiple fittings, hand embroidery." }
      ]
    },
    beauty: {
      label: "Hair & makeup", min: 150, max: 3000, step: 50, start: 650,
      vendors: [
        { name: "Dana Ferris Beauty", price: 280, blurb: "Bridal hair and makeup, one trial included." },
        { name: "Willowbrook Beauty Bar", price: 420, blurb: "Hair and makeup for bride plus 1, no trial." },
        { name: "Studio Eleven", price: 620, blurb: "Hair and makeup for bride plus 2, trial included." },
        { name: "The Vanity Room", price: 850, blurb: "Hair and makeup for bride plus 4, trial included." },
        { name: "The Powder Room Co.", price: 1150, blurb: "Full bridal party coverage, on-site team of 3." },
        { name: "Gilt & Glow Artistry", price: 1600, blurb: "Full bridal party plus mother-of-bride, airbrush option." },
        { name: "Lumière Beauty Bar", price: 2100, blurb: "Luxury airbrush service, touch-ups through reception." },
        { name: "The Atelier Beauty Studio", price: 2600, blurb: "Editorial-level styling, two artists, full-day availability." }
      ]
    },
    rentals: {
      label: "Rentals", min: 300, max: 6000, step: 100, start: 1400,
      vendors: [
        { name: "Common Table Rentals", price: 650, capacity: 100, blurb: "Tables, chairs, and linens for up to 100 guests." },
        { name: "Fieldstone Event Rentals", price: 1050, capacity: 120, blurb: "Farm tables, cross-back chairs, basic linens." },
        { name: "Amber & Oak Event Co.", price: 1550, capacity: 130, blurb: "Farmhouse tables, market lighting, lounge set." },
        { name: "The Linen Loft", price: 2100, capacity: 120, blurb: "Upgraded linens, glassware, and place settings for 120." },
        { name: "Grandview Rental Co.", price: 2900, capacity: 150, blurb: "Tenting, full lighting design, dance floor." },
        { name: "Elm & Ivory Event Rentals", price: 3700, capacity: 180, blurb: "Clear-top tent, chandelier lighting, full furniture suite." },
        { name: "The Tented Table", price: 4600, capacity: 200, blurb: "Full luxury tenting and furniture package." },
        { name: "Grand Pavilion Rentals", price: 5500, capacity: 250, blurb: "Sailcloth tenting, custom flooring, full lounge design." }
      ]
    }
  };
