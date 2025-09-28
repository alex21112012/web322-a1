const projectData = require("../data/projectData"); 
const sectorData = require("../data/sectorData"); 

let projects = [];

function initialize() {
  return new Promise((resolve, reject) => {
    projects = []; 

    projectData.forEach((p) => {
      let sectorFound = sectorData.find((s) => s.id === p.sector_id);

      let sectorName = "Null";
      if (sectorFound) {
        sectorName = sectorFound.sector_name;
      }

      const newObj = { ...p, sector: sectorName };
      projects.push(newObj);
    });

    
    resolve(); 
  });
}

function getAllProjects() {
  return new Promise((resolve, reject) => {
    if (projects.length === 0) {
      reject("Unable to find requested projects");
      return; 
    }
    resolve(projects); 
  });
}

function getProjectById(projectId) {
  return new Promise((resolve, reject) => {
    const choosenId = Number(projectId); 
    const found = projects.find((p) => p.id === choosenId);

    if (found) {
      resolve(found);
      return;
    }

    reject(`Unable to find requested project (id=${projectId}).`);
  });
}

function getProjectsBySector(sector) {
  return new Promise((resolve, reject) => {
    let sectorStr = `${sector ?? ""}`.trim().toLowerCase();
    if (!sectorStr) { 
      reject("You need to enter the sector."); 
      return; 
    }

    let validFound = projects.filter((p) =>
      `${p.sector ?? ""}`.trim().toLowerCase().includes(sectorStr)
    );

    if (validFound.length) { 
      resolve(validFound); 
      return; 
    }

    reject(`Sector not found "${sector}".`);
  });
}


module.exports = { initialize, getAllProjects, getProjectById, getProjectsBySector };


