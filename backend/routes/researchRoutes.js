import express from 'express';
import { z } from 'zod';
import { saveResearchSubmission, getResearchStats, deleteParticipantData } from '../services/dbService.js';

const router = express.Router();

// Validation Schema for Survey Payload
const surveyPayloadSchema = z.object({
  ageGroup: z.string().min(1, 'Age group is required'),
  country: z.string().min(1, 'Country is required'),
  occupation: z.string().optional(),
  listeningContexts: z.array(z.string()).optional(),
  genres: z.array(z.string()).optional(),
  musicHours: z.string().optional(),
  consentGiven: z.boolean().refine(val => val === true, 'Consent is required')
});

// POST /api/research/submit
router.post('/submit', async (req, res) => {
  try {
    const validatedData = surveyPayloadSchema.parse(req.body);
    const result = await saveResearchSubmission(validatedData);
    return res.status(201).json({
      success: true,
      message: 'Survey response recorded successfully',
      participantId: result.participantId,
      timestamp: result.timestamp
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: error.errors
      });
    }
    console.error('Research submission error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error while saving research submission'
    });
  }
});

// GET /api/research/stats
router.get('/stats', async (req, res) => {
  try {
    const stats = await getResearchStats();
    return res.status(200).json({
      success: true,
      stats
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Failed to retrieve research statistics'
    });
  }
});

// DELETE /api/research/participant/:id
router.delete('/participant/:id', async (req, res) => {
  try {
    const participantId = req.params.id;
    if (!participantId || !participantId.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Participant ID is required'
      });
    }
    const result = await deleteParticipantData(participantId.trim());
    return res.status(200).json({
      success: true,
      message: 'Participant record deletion request processed',
      result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Failed to process deletion request'
    });
  }
});

export default router;
