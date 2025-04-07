import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createGroup,
  getMyGroups,
  inviteToGroup,joinGroupByCode,
  removeFromGroup,
  deleteGroup,getOwnedGroups
} from '../controllers/groupController.js';

const router = express.Router();

router.post('/', protect, createGroup);
router.get('/', protect, getMyGroups);
router.get('/owned', protect, getOwnedGroups);
router.put('/:groupId/invite', protect, inviteToGroup);
router.post('/join', protect, joinGroupByCode);
router.put('/:groupId/remove', protect, removeFromGroup);
router.delete('/:groupId', protect, deleteGroup);

export default router;
