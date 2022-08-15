import { Video } from '@/domain/models/video-model';

export type GetSearchCacheFromState = (search: string) => Video[];
