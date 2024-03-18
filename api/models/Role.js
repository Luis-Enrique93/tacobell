/**
 * Role.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: {
      type: "string",
      required: true,
      unique: true,
    },
    description: {
      type: "string",
      allowNull: true,
    },
    // Sucursales que puede administrar
    branchs: {
      type: "json",
      defaultsTo: [],
    },
    branchAccessType: {
      type: "string",
      isIn: ["Todas", "Multiples", "Unica"],
      defaultsTo: "Todas",
    },
    // Companías que puede administrar
    companies: {
      type: "json",
      defaultsTo: [],
    },
    companyAccessType: {
      type: "string",
      isIn: ["Todas", "Multiples", "Unica"],
      defaultsTo: "Todas",
    },
    access: {
      type: "json",
      defaultsTo: [
        {
          name: "Dashboard",
          route: "/dashboard",
          canAccess: false,
        },
        // {
        //   name: "Órdenes",
        //   route: "/dashboard",
        //   canAccess: false,
        // },
        {
          name: "Órdenes del día",
          route: "/dashboard",
          canAccess: false,
        },
        {
          name: "Historial de órdenes",
          route: "/dashboard",
          canAccess: false,
        },
        {
          name: "Órdenes con problemas",
          route: "/dashboard",
          canAccess: false,
        },
        {
          name: "Motoristas con emergencias",
          route: "/dashboard",
          canAccess: false,
        },
        {
          name: "Tiempo",
          route: "/dashboard",
          canAccess: false,
        },
        {
          name: "Localización",
          route: "/dashboard",
          canAccess: false,
        },
        // {
        //   name: "Motoristas",
        //   route: "/dashboard",
        //   canAccess: false,
        // },
        {
          name: "Motoristas",
          route: "/dashboard",
          canAccess: false,
        },
        {
          name: "Reportería",
          route: "/dashboard",
          canAccess: false,
        },
        // {
        //   name: "Configuraciones",
        //   route: "/dashboard",
        //   canAccess: false,
        // },
        {
          name: "Sucursales",
          route: "/dashboard",
          canAccess: false,
        },
        {
          name: "Compañía",
          route: "/dashboard",
          canAccess: false,
        },
        {
          name: "Canales de venta",
          route: "/dashboard",
          canAccess: false,
        },
        {
          name: "Horarios de delivery",
          route: "/dashboard",
          canAccess: false,
        },
        {
          name: "Problemas y emergencias",
          route: "/dashboard",
          canAccess: false,
        },
        {
          name: "Usuarios del sistema",
          route: "/dashboard",
          canAccess: false,
        },
      ],
    },
  },
};
