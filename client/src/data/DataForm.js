import SME from "/assets/images/SME.png";
import SMQ from "/assets/images/SMQ.png";
import SMSST from "/assets/images/SMSST.png";
import Certification from "/assets/images/Certification.png";
import imageHolder from "/assets/images/imageHolder.jpg";
import Dispostions from "/assets/images/Dispostions.png";
import Formations from "/assets/images/Formations.png";
import NormsISo from "/assets/images/normsISo.png";

const mainPageImages = {
    Certification: {
        Image: Certification,
        Title: "Certification",
        Link : "/view2",
    },
    Formations: {
        Image: Formations,
        Title: "Formations",
        Link : "/Formations",
        
    },
    SMSST: {
        Image: SMSST,
        Title: "SMSST",
        Link : "/SMSST",
    },
    SME: {
        Image: SME,
        Title: "SME",
        Link : "/SME",
    },
    SMQ: {
        Image: SMQ,
        Title: "SMQ",
        Link : "/SMQ",
    },
    normsISo: {
        Image: NormsISo,
        Title: "NormsISo",
        Link : "/NormsISo",
    },
    Dispostions: {
        Image: Dispostions,
        Title: "Dispostions",
        Link : "/Dispostions",
    },
};

const View4Data = {
    Certification: {
        Image: imageHolder,
        Title: "Certification",
        Link : "/Certification",
        Details: "This is the thing that you will need when you get the thing your already have"
    },
    Formations: {
        Image: imageHolder,
        Title: "Formations",
        Link : "/Formations",
        Details: "This is the thing that you will need when you get the thing your already have"
        
    },
    SMSST: {
        Image: imageHolder,
        Title: "SMSST",
        Link : "/SMSST",
        Details: "This is the thing that you will need when you get the thing your already have"

    },
    SME: {
        Image: imageHolder,
        Title: "SME",
        Link : "/SME",
        Details: "This is the thing that you will need when you get the thing your already have"

    },
    SMQ: {
        Image: imageHolder,
        Title: "SMQ",
        Link : "/SMQ",
        Details: "This is the thing that you will need when you get the thing your already have"

    },
    SMQ2: {
        Image: imageHolder,
        Title: "SMQ2",
        Link : "/SMQ",
        Details: "This is the thing that you will need when you get the thing your already have"

    },
    SMQ3: {
        Image: imageHolder,
        Title: "SMQ3",
        Link : "/SMQ",
        Details: "This is the thing that you will need when you get the thing your already have"

    },
};

const viewOptions = [
    {
      name: "View1",
      imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/View1.webp`,
      titre: "Voir 1",
    },
    {
      name: "View2",
      imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/View2.webp`,
      titre: "Voir 2",
    },
    {
      name: "View3",
      imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/View3.webp`,
      titre: "Voir 3",
    },
    {
      name: "View4",
      imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/View4.webp`,
      titre: "Voir 4",
    },
    {
      name: "View5",
      imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/View5.webp`,
      titre: "Voir 5",
    },
    {
      name: "View7",
      imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/View7.webp`,
      titre: "Voir 7",
    },
    {
      name: "TableView",
      imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/TableView.webp`,
      titre: "Vue de table",
    },
    {
      name: "PdfReader",
      imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/PdfReader.webp`,
      titre: "Lecteur PDF",
    },
    {
      name: "ExcelReader",
      imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/ExcelReader.webp`,
      titre: "Lecteur Excel",
    },
    {
      name: "WordReader",
      imgSrc: `${import.meta.env.VITE_PUBLIC_URL1}/WordReader.webp`,
      titre: "Lecteur Word",
    },
  ];

 

export  {mainPageImages , View4Data ,viewOptions};
