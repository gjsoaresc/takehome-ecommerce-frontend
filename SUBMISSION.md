# Submission

## Overview

I started by structuring the **product listing layout** to improve usability and ensure a smooth browsing experience.

Next, I implemented **advanced filtering options**, allowing users to refine their search by **categories, brands, colors, shoe sizes, and price range**. These filters dynamically update without requiring a page reload, improving usability.

Following this, I enhanced the **product display** by ensuring consistent **card heights** and optimizing the **grid layout** to prevent unnecessary gaps. Additionally, I improved the **pagination system**, limiting the results to **9 products per page** for a more structured browsing experience.

To enhance user experience, I added **sorting options** that allow users to sort products by **price and name**, improving the ability to find relevant items quickly.

Lastly, I introduced **database seeding** functionality, which is available only for **admin users**. This feature ensures that an admin can quickly populate the database with sample data using a single click.

## CHANGELOG

### Product Listing Page

#### Frontend

- **Structured the layout** for better usability.
- Implemented **dynamic filtering options**:
  - Users can filter by **categories, brands, colors, shoe sizes, and price range**.
  - Filters update dynamically without requiring a page reload.
- Improved **product card layout**:
  - Ensured **consistent heights** to prevent layout shifts.
  - Limited display to **9 products per page** for better readability.
- Added **sorting functionality**:
  - Users can sort by **price (low to high, high to low)**.
  - Users can sort by **name (A-Z, Z-A)**.
- Improved **pagination**:
  - Displayed **total pages and controlled results per page**.

#### Backend

- Integrated **filtering and sorting functionality** in the product API.
- Ensured API requests support **category, brand, color, and shoe size filtering**.
- Implemented **server-side pagination** to efficiently load data.

### Authentication & Seeding

- Implemented **JWT-based authentication** with protected routes.
- Displayed **user avatar and name** when logged in.
- Added a **database seeding feature**:
  - Available **only for admin users**.
  - Admins can seed the database via the home page.
  - The seed button disappears after successful execution.

Took approximately **3-4 hours** to complete.
