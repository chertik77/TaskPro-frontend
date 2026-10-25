import type { BoardIcon } from '@/shared/api'
import type { LucideIcon } from 'lucide-react'

import {
  Compass,
  Kanban,
  Layers,
  Layout,
  Leaf,
  Orbit,
  Palette,
  Sparkles,
  Sunrise,
  Target
} from 'lucide-react'

export const BOARD_ICONS: Record<BoardIcon, LucideIcon> = {
  sparkles: Sparkles,
  layout: Layout,
  kanban: Kanban,
  layers: Layers,
  compass: Compass,
  target: Target,
  sunrise: Sunrise,
  orbit: Orbit,
  palette: Palette,
  leaf: Leaf
}
