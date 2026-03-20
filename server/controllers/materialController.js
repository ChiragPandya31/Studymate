import Material from "../models/Material.js";

// GET all materials
export const getAllMaterials = async (req, res) => {
  try {
    const { course, semester, subject, materialType } = req.query;

    const query = {};

    if (course) query.course = course.toLowerCase();
    if (semester) query.semester = semester.toString();
    if (subject) query.subject = subject.toLowerCase();
    if (materialType) query.materialType = materialType.toLowerCase();

    const materials = await Material.find(query);
    res.status(200).json(materials);
  } catch (err) {
    console.error("Failed to fetch materials:", err);
    res.status(500).json({ error: "Failed to fetch materials" });
  }
};


// CREATE new material
export const createMaterial = async (req, res) => {
  try {
    const { title, course, semester, subject, materialType } = req.body;

    if (!req.file || !title || !course || !semester || !subject || !materialType) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const filePath = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    const newMaterial = new Material({
      title,
      course: course.toLowerCase(),
      semester,
      subject: subject.toLowerCase(),
      materialType: materialType.toLowerCase(),
      contentURL: filePath,
    });

    const saved = await newMaterial.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating material:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE material
export const deleteMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Material.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Material not found" });

    res.json({ message: "Material deleted successfully" });
  } catch (err) {
    console.error("Error deleting material:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// INCREMENT views
export const updateViews = async (req, res) => {
  try {
    const { id } = req.params;
    const material = await Material.findById(id);
    if (!material) return res.status(404).json({ message: "Material not found" });

    material.views = (material.views || 0) + 1;
    await material.save();
    res.json({ message: "View count updated", views: material.views });
  } catch (err) {
    console.error("Error updating views:", err);
    res.status(500).json({ message: "Server error" });
  }
};
