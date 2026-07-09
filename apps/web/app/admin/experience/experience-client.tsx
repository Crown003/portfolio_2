"use client";

import React, { useState } from "react";
import { createExperience, updateExperience, deleteExperience } from "../../actions/experience";
import { useToast } from "../../../components/toast-provider";
import { FiPlus } from "react-icons/fi";

export default function ExperienceClient({ initialExperiences }: { initialExperiences: any[] }) {
  const { showToast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [experiences, setExperiences] = useState(initialExperiences);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form State
  const [company, setCompany] = useState("");
  const [totalDuration, setTotalDuration] = useState("");
  const [calcStartDate, setCalcStartDate] = useState("");
  const [calcEndDate, setCalcEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [logoInitial, setLogoInitial] = useState("");
  const [order, setOrder] = useState(0);
  const [rolesJson, setRolesJson] = useState("[]");
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (calcStartDate) {
      const start = new Date(calcStartDate);
      const end = calcEndDate ? new Date(calcEndDate) : new Date();
      
      let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
      // Inclusive of the start month, usually add 1
      months += 1;
      if (months < 0) months = 0;
      
      if (!calcEndDate) {
        const years = Math.floor(months / 12);
        if (years >= 1) {
            setTotalDuration(`${years}+ yrs`);
        } else {
            setTotalDuration(`${months}+ mos`);
        }
      } else {
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        let durationStr = [];
        if (years > 0) durationStr.push(years === 1 ? "1 yr" : `${years} yrs`);
        if (remainingMonths > 0) durationStr.push(remainingMonths === 1 ? "1 mo" : `${remainingMonths} mos`);
        if (durationStr.length === 0) durationStr.push("1 mo");
        setTotalDuration(durationStr.join(" "));
      }
    }
  }, [calcStartDate, calcEndDate]);

  const resetForm = () => {
    setCompany("");
    setTotalDuration("");
    setCalcStartDate("");
    setCalcEndDate("");
    setLocation("");
    setLogoInitial("");
    setOrder(0);
    setRolesJson("[]");
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (exp: any) => {
    setShowForm(true);
    setEditingId(exp.id);
    setCompany(exp.company);
    setTotalDuration(exp.totalDuration);
    setCalcStartDate("");
    setCalcEndDate("");
    setLocation(exp.location);
    setLogoInitial(exp.logoInitial);
    setOrder(exp.order);
    setRolesJson(JSON.stringify(exp.roles, null, 2));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    setLoading(true);
    await deleteExperience(id);
    setExperiences(experiences.filter(e => e.id !== id));
    setLoading(false);
    showToast("success", "Experience deleted successfully.");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    let parsedRoles = [];
    try {
      parsedRoles = JSON.parse(rolesJson);
    } catch (e) {
      showToast("error", "Invalid JSON format in Roles field.");
      setLoading(false);
      return;
    }

    const data = {
      company,
      totalDuration,
      location,
      logoInitial,
      order,
      roles: parsedRoles
    };

    if (editingId) {
      await updateExperience(editingId, data);
      setExperiences(experiences.map(e => e.id === editingId ? { ...e, ...data } : e));
      showToast("success", "Experience updated successfully.");
      resetForm();
      setLoading(false);
    } else {
      // In a real app we'd fetch the generated ID, here we just optimistically append without id and refresh
      await createExperience(data);
      showToast("success", "Experience added successfully.");
      setTimeout(() => {
        window.location.reload(); 
      }, 500);
    }
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 max-w-4xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-bold">Existing Experiences</h2>
        {!showForm && (
          <button 
            onClick={() => setShowForm(true)} 
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-lg text-xs hover:opacity-90 active:scale-98 transition-all duration-200 shadow-md cursor-pointer select-none whitespace-nowrap"
          >
            <FiPlus className="w-4 h-4" />
            <span>Add Experience</span>
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">{editingId ? "Edit Experience" : "Add New Experience"}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1 sm:col-span-2">
              <label className="text-sm font-medium">Auto-Calculate Duration</label>
              <div className="flex gap-2">
                <input type="month" value={calcStartDate} onChange={e => setCalcStartDate(e.target.value)} className="p-2 border rounded bg-background flex-1 text-sm" aria-label="Start Month" />
                <input type="month" value={calcEndDate} onChange={e => setCalcEndDate(e.target.value)} className="p-2 border rounded bg-background flex-1 text-sm" aria-label="End Month (Leave empty for Present)" />
                <button type="button" onClick={() => { setCalcStartDate(''); setCalcEndDate(''); }} className="px-3 py-2 border rounded hover:bg-muted text-sm shrink-0">Clear</button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Pick dates to auto-fill the Total Duration field. Leave End Date blank for present/ongoing.</p>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Company/Title</label>
              <input required value={company} onChange={e => setCompany(e.target.value)} className="p-2 border rounded bg-background" placeholder="e.g. TMG Esports" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Total Duration (Manual Override)</label>
              <input required value={totalDuration} onChange={e => setTotalDuration(e.target.value)} className="p-2 border rounded bg-background" placeholder="e.g. 3 yrs" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Location</label>
              <input required value={location} onChange={e => setLocation(e.target.value)} className="p-2 border rounded bg-background" placeholder="e.g. Remote" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Logo Initial</label>
              <input required value={logoInitial} onChange={e => setLogoInitial(e.target.value)} className="p-2 border rounded bg-background" placeholder="e.g. T" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Order (sort)</label>
              <input type="number" value={order} onChange={e => setOrder(parseInt(e.target.value))} className="p-2 border rounded bg-background" />
            </div>
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Roles (JSON array of objects)</label>
            <textarea 
              required 
              rows={10} 
              value={rolesJson} 
              onChange={e => setRolesJson(e.target.value)} 
              className="p-2 border rounded bg-background font-mono text-sm" 
              placeholder={`[{"title": "Role", "type": "Part-time", "duration": "...", "location": "...", "description": "...", "skills": [{"name":"Python"}]}]`}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mt-2">
            <button disabled={loading} type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded font-medium hover:bg-primary/90">
              {loading ? "Saving..." : "Save"}
            </button>
            {editingId ? (
              <button type="button" onClick={resetForm} className="px-4 py-2 border rounded hover:bg-muted">
                Cancel Edit
              </button>
            ) : (
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border rounded hover:bg-muted">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      )}

      <div className="flex flex-col gap-4">
        {experiences.sort((a, b) => a.order - b.order).map(exp => (
          <div key={exp.id} className="p-4 border border-border rounded-lg bg-card flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h3 className="font-bold">{exp.company} <span className="text-muted-foreground text-sm font-normal sm:ml-2 inline-block">(Order: {exp.order})</span></h3>
              <p className="text-sm text-muted-foreground mt-1">{exp.totalDuration} · {exp.location}</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button onClick={() => handleEdit(exp)} className="flex-1 sm:flex-none px-4 py-2 sm:px-3 sm:py-1 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/80 font-medium">Edit</button>
              <button onClick={() => handleDelete(exp.id)} className="flex-1 sm:flex-none px-4 py-2 sm:px-3 sm:py-1 bg-red-500/10 text-red-500 rounded text-sm hover:bg-red-500/20 font-medium">Delete</button>
            </div>
          </div>
        ))}
        {experiences.length === 0 && <p className="text-muted-foreground text-sm">No experiences found.</p>}
      </div>
    </div>
  );
}
