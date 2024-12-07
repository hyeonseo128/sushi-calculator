document.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById("sushi-calculator");
  const totalWeightDisplay = document.getElementById("total-weight");
  const cupQuotientDisplay = document.getElementById("cup-quotient");
  const cupRemainderDisplay = document.getElementById("cup-remainder");

  function calculateSums() {
    const rows = table.querySelectorAll("tbody tr:not(#column-sum-row)");
    const columnTotals = Array(10).fill(0); // 열 합계 초기화
    let overallTotal = 0; // 총 밥량 초기화

    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");
      let rowSum = 0; // 행 합계 초기화

      // 수량 가져오기
      let quantity = parseInt(cells[1].textContent) || 1;
      if (quantity < 1) quantity = 1; // 수량이 1보다 작으면 1로 설정
      cells[1].textContent = quantity;

      // 각 열의 합계 및 총 밥량 계산
      for (let i = 2; i <= 9; i++) { // 3~10번째 열
        const value = parseFloat(cells[i].textContent) || 0;
        columnTotals[i] += value * quantity; // 수량 곱 적용
        rowSum += value * quantity; // 행 합계에 수량 반영
      }

      cells[10].textContent = `${rowSum}g`; // 행 합계 업데이트
      overallTotal += rowSum; // 총 밥량에 행 합계 추가
    });

    const totalCells = table.querySelectorAll("#column-sum-row td");
    totalCells[0].textContent = "합계"; // 첫 번째 칸에 "합계" 표시

    for (let i = 2; i <= 9; i++) {
      totalCells[i].textContent = `${columnTotals[i]}g`; // 열 합계 표시
    }

    totalCells[10].textContent = `${overallTotal}g`; // 전체 합계 표시
    totalWeightDisplay.textContent = `${overallTotal}g`; // 총 밥량 업데이트

    // 컵 계산
    const quotient = Math.floor(overallTotal / 750);
    const remainder = overallTotal % 750;

    cupQuotientDisplay.textContent = quotient; // 몫 표시
    cupRemainderDisplay.textContent = `${remainder}g`; // 나머지 표시
  }

  table.addEventListener("input", calculateSums); // 입력 이벤트 감지
});
