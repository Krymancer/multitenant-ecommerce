import type { CollectionConfig } from 'payload'

export const Tenant: CollectionConfig = {
  slug: 'tenants',
  admin: {
    useAsTitle: 'slug',
  },
  fields: [
    {
      name: "name",
      required: true,
      type: "text",
      label: "Store Name",
      admin: {
        description: "This is the name of the store (e.g. 'My Store')",
      }
    },
    {
      name: "slug",
      type: "text",
      index: true,
      required: true,
      unique: true,
      admin: {
        description: "This is the subdomain of the store (e.g. '[slug].funroad.com')",
      }
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "stripeAccountId",
      type: "text",
      required: true,
      admin: {
        readOnly: true
      },
    },
    {
      name: "stripeDetailsSubmited",
      type: "checkbox",
      admin: {
        readOnly: true,
        description: "You cannot create products until you submit your Stripe details"
      }
    }
  ],
}
