# 先输入commit信息，确认后再暂存代码
read -p "→ 请输入您的commit提交信息：" MSG

echo → 暂存选取所有代码
git add .

echo → 提交所有暂存代码
git commit -m "$MSG"

echo → 将代码推送至远端git仓库
git push -u origin 2.6

echo → 重新fetch最新代码
git fetch

