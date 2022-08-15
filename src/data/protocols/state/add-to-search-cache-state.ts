import { Video } from '@/domain/models/video-model';

export type AddToSearchCacheOnState = (search: string, result: Video[]) => void;
