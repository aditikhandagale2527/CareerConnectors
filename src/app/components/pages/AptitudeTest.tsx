const handleSubmit = async () => {
    setSubmitted(true)
    let score = 0
    questions.forEach(q => {
      if (selected[q.id] === q.answer) score++
    })

    // Save to localStorage as before
    localStorage.setItem("aptitudeScore", JSON.stringify({ score, total: totalQ }))

    // ✅ Also save to MongoDB
    try {
      const sections: Record<string, number> = {}
      ;["LRDI", "QA", "VARC"].forEach(section => {
        const sectionQs = questions.filter(q => q.section === section)
        sections[section] = sectionQs.filter(q => selected[q.id] === q.answer).length
      })

      await API.post("/api/ai/save-aptitude", {
        score,
        total: totalQ,
        sections
      })
    } catch {
      console.error("Could not save aptitude score to server")
    }
  }
