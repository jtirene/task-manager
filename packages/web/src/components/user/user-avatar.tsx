import { AvatarFallback } from '@radix-ui/react-avatar'
import { Avatar, AvatarImage } from '../ui/avatar'

type UserAvatarProps = {
	imageSrc?: string
	imageFallback?: string
}

export const UserAvatar = ({ imageSrc, imageFallback }: UserAvatarProps) => {
	return (
		<Avatar>
			<AvatarImage src={imageSrc} />
			<AvatarFallback>{imageFallback}</AvatarFallback>
		</Avatar>
	)
}
