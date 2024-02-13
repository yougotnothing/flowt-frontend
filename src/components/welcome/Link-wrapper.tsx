import { Icon, Link, Strong, LinkWrapper as Wrapper } from "./Welcome.styled"

export const LinkWrapper: React.FC<{ size: 'small' | 'big' }> = ({ size }) => {
  return (
    <Wrapper $size={size} $direction="column">
      <Icon
        $url="/github-logo.png"
        target="_blank"
        href="https://github.com/yougotnothing/flowt-frontend"
      />
      <Wrapper $size={size} $direction="row">
        <Strong>
          <Link
            $strong
            target="_blank"
            href="https://github.com/vilsoncake"
          >VilsonCake</Link>
          <Link
            $strong
            target="_blank"
            href="https://github.com/yougotnothing"
          >yougotnothing</Link>
        </Strong>
      </Wrapper>
    </Wrapper>
  )
}